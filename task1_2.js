const csv = require('csvtojson');
const fs = require('fs');

fs.writeFileSync('./csv/output.txt', '');

const readStream = fs.createReadStream('./csv/nodejs-hw1-ex1.csv').on('error', console.log);
const writeStream = fs.createWriteStream('./csv/output.txt', 'utf8').on('error', console.log);
readStream.pipe(csv()).pipe(writeStream);
