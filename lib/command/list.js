'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const tryCatch = require('try-catch');

module.exports = (argv) => {
    const name = argv._[1];
    const directories = name || argv.all || argv.directories;
    const commands = name || argv.all || argv.commands;
    const all = name || argv.all || commands || directories;
    
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const error = tryCatch(() => {
        readjson.sync(longrunPath)
            .filter((runner) => {
                if (!name)
                    return runner;
               else
                    return name === runner.name;
            })
            .forEach((runner) => {
                const symbol = all ? '* ' : '';
                console.log((`${symbol}${runner.name}`));
                
                if (all) {
                    commands && console.log('>', `${runner.command}`);
                    directories && runner.directories.forEach((dir) => {
                        console.log(`|  ${dir}`);
                    });
                }
            });
    });
    
    exitIfError(error);
};

function exitIfError(error) {
    error && exit(error.message);
}

function exit(message) {
    console.error(message);
    process.exit(-1);
}

