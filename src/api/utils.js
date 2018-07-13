function makeResult(p1, p2, methodName) {
    return Promise.all([p1, p2])
        .then(results => ( 
            {
                methodName: methodName,
                firstElapsedTime: results[0],
                secondElapsedTime: results[1]
            }
        ));
}

function getElapsedTime(promise) {
    const start = Date.now();
    
    return promise.then(() => Date.now() - start);
}

export default {
    makeResult,
    getElapsedTime
}