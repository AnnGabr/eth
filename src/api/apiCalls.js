import Web3 from 'web3';

const infura = 'https://rinkeby.infura.io/PYGXbTRCnHENtUdSaQAu';
const infuraSock = 'wss://rinkeby.infura.io/_ws';

const myWallet = '0xa158b862DF115a413b804EF8FD1A55F6552e71C8';
const bsuContractABI = '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]';
const bsuContractAddress = '0x97cE6CE1ddb481a9B0fb8e2cE7316Cfd9FF6f534';

const remote = new Web3();
remote.setProvider(new Web3.providers.WebsocketProvider(infuraSock));
console.log(remote);

const bsuContract = new remote.eth.Contract(JSON.parse(bsuContractABI), bsuContractAddress);

export const getLogs = () => {
    const params = {
        jsonrpc: '2.0',
	    method: 'eth_getLogs',
	    params: [{
            fromBlock: '0x0', 
            toBlock: 'latest', 
            address: bsuContractAddress,
	    }],
	    id: 67
    }

    return fetch(infura, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
        .then(response => response.json())
}

export const getBalance = () => {
    const start = Date.now();
    //console.log(JSON.parse(bsuContractABI));
    bsuContract.methods.balanceOf(myWallet).call().then(result => {console.log(result);});
    
    console.log(bsuContract);
    console.log(bsuContract.events.allEvents(
        {fromBlock: 0, toBlock: 'latest' }, function(event) {console.log(event);}
    ));

    return getLogs().then(() => {return Date.now() - start});
}


