import csv from 'csvtojson';
import { writeFileSync, createReadStream, createWriteStream } from 'fs';

writeFileSync('./csv/output.txt', '');

const readStream = createReadStream('./csv/nodejs-hw1-ex1.csv').on('error', console.log);
const writeStream = createWriteStream('./csv/output.txt', 'utf8').on('error', console.log);
readStream.pipe(csv()).pipe(writeStream);
