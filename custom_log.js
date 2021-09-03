const fs = require('fs');
const write = (data) => fs.appendFileSync('./debug.log', data);
const old_log = console.log;
const { EOL } = require('os');
const getCurrentTime = () => {
    return new Date().toLocaleString().replace(/\./gi, ':');
};

const checkError = (err) => {
    return err && err.stack && err.message;
};

const custom = {
    warn: (message) => {
        const time = getCurrentTime();
        old_log(`\x1b[0m\x1b[36m${time}\x1b[34m -- \x1b[1;33m[WARN]\x1b[0m ${message}`);
        write(`${time} -- [WARN] ${message}${EOL}`);
    },
    print: (message) => {
        const time = getCurrentTime();
        old_log(`\x1b[0m\x1b[36m${time}\x1b[34m -- \x1b[32m[INFO]\x1b[0m ${checkError(message) ? message.stack : message}`);
        write(`${time} -- [INFO] ${checkError(message) ? message.message : message}${EOL}`);
    },
    error: (err) => {
        const time = getCurrentTime();
        old_log(`\x1b[0m\x1b[36m${time}\x1b[34m -- \x1b[1;31m[ERROR]\x1b[0m ${
            checkError(err) ? err.stack : err
        }`);
        write(`${time} -- [ERROR] ${
            checkError(err) ? err.stack : err
        }${EOL}`);
    },
};

write(`--${EOL}`);

process.on('uncaughtException', (err, origin) => {
    custom.error(err);
});

process.on('uncaughtRejection', (err, origin) => {
    custom.error(err);
});

console.log = custom.print;
console.warn = custom.warn;
console.error = custom.error;

module.exports = custom;