import utils from './utils';
import ethNodes, { contractABI, contractAddress, wallet } from './nodes';

const local = ethNodes.initLocal();
const remote = ethNodes.initRemote();

const BALANCE_EVENTS = ['Transfer'];

const getElapsedTimeBalance = () => {
    const promiseFromFirstEndPoint = utils.getElapsedTime(getBalance(local.contract, wallet));
    const promiseFromSecondEndPoint = utils.getElapsedTime(getBalance(remote.contract, wallet));

    return utils.makeResult(promiseFromFirstEndPoint, promiseFromSecondEndPoint, 'balanceOf');
}

const getElapsedTimeLogs = () => {
    const topics = generateTopics(contractABI, BALANCE_EVENTS, local.node);
    const promiseFromFirstEndPoint = utils.getElapsedTime(getFilteredLogs(local.host, contractAddress, topics));
    const promiseFromSecondEndPoint = utils.getElapsedTime(getFilteredLogs(remote.host, contractAddress, topics));

    return utils.makeResult(promiseFromFirstEndPoint, promiseFromSecondEndPoint, 'getFilteredLogs');
}

function generateTopics(contractABI, eventNames, node) {
    const topics = [];

    contractABI.forEach( item => {
        if (eventNames.includes(item.name)) {
            topics.push(item.signature);
        }
    })

    return topics;
}

function getFilteredLogs(url, contractAddress, topics) {
    const params = {
        jsonrpc: '2.0',
	    method: 'eth_getLogs',
	    params: [{
            fromBlock: '0x0', 
            toBlock: 'latest', 
            address: contractAddress,
            topics
	    }],
	    id: 67
    }

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
        .then(response => response.json());      
}

function getBalance (contract, wallet) {
    return contract.methods.balanceOf(wallet).call();
}

export default {
    METHODS_FOR_TIME_TEST: [
        getElapsedTimeLogs, 
        getElapsedTimeBalance,
    ]
};


