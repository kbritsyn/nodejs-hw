const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', line => {
    process.stdout.write(`${line.split('').reverse().join('')}\n`);
});
