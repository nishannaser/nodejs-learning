/**
 * Without promises
 */
/*
console.log('Before');
getUser(1, user => {
    console.log('User:', user);
    getRepositories(user.username, repos => {
        console.log('Repos:', repos);
        getCommits(repos[0], commits => {
            console.log('Commits: ', commits);
        });
    });
});
console.log('After');

function getUser(id, callback) {
    setTimeout(() => {
        console.log('Reading user from datbase...');
        callback({id: id, username: 'Nishan'});
    }, 2000);
}

function getRepositories(userName, callback) {
    setTimeout(() => {
        console.log('Calling github API for repos...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}

function getCommits(repoName, callback) {
    setTimeout(() => {
        console.log('Calling github API for commits...');
        callback(['commit1', 'commit2']);
    }, 2000);
}
*/

/**
 * With promises
 */
console.log('Before');

// Promise-based approach
// getUser(1)
//     .then(user => getRepositories(user.userName))
//     .then(repos => getCommits(repos[0]))
//     .then(commits => console.log('Commits:', commits))
//     .catch(err => console.log('Error:', err.message));

// Async and Await approach
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.userName);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    } catch (err) {
        console.log('Error:', err.message);
    }
}
displayCommits();

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading user from database...');
            resolve({id: id, userName: 'Nishan'});
        }, 2000);
    });

}

function getRepositories(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github API for repos...');
            resolve(['repo1', 'repo2', 'repo3']);
        }, 2000);
    });
}

function getCommits(repoName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling github API for commits...');
            resolve(['commit1', 'commit2']);
        }, 2000);
    });
}