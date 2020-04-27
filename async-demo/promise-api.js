const p1 = Promise.resolve(1);
p1.then(result => console.log('Result:', result));

const p2 = Promise.reject(new Error('Something failed!'));
p2.catch(err => console.log(`Error: ${err.message}`));

const p3 = new Promise(resolve => {
    setTimeout(() => {
        console.log('Async operation 1......');
        resolve(1);
    }, 2000);
});

const p4 = new Promise(resolve => {
    setTimeout(() => {
        console.log('Async operation 2......');
        resolve(1);
    }, 2000);
});

Promise.all([p3, p4])
    .then(result => console.log('All: ', result));

// Promise.race([p3, p4])
//     .then(result => console.log('Race: ', result));
