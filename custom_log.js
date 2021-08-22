const fs = require('fs');
const write = (data) => fs.appendFileSync('./debug.log', data);

const getCurrentTime = () => {
    return new Date().toLocaleString().replace(/\./gi, ':');
};

write('--\n');

module.exports = {
    warn: (...message) => {
        console.log(`\x1b[0m\x1b[36m${getCurrentTime()}\x1b[34m -- \x1b[1;33m[WARN]\x1b[0m ${message}`);
        write(`${getCurrentTime()} -- [WARN] ${message}\n`);
    },
    print: (...message) => {
        console.log(`\x1b[0m\x1b[36m${getCurrentTime()}\x1b[34m -- \x1b[32m[INFO]\x1b[0m ${message}`);
        write(`${getCurrentTime()} -- [INFO] ${message}\n`);
    },
    error: (...message) => {
        console.log(`\x1b[0m\x1b[36m${getCurrentTime()}\x1b[34m -- \x1b[1;31m[ERROR]\x1b[0m ${message}`);
        write(`${getCurrentTime()} -- [ERROR] ${message}\n`);
    },
};