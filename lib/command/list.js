'use strict';

const tryCatch = require('try-catch');
const ifNotFound = require('../if-not-found');

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const directories = name || argv.all || argv.directories;
    const commands = name || argv.all || argv.commands;
    const all = name || argv.all || commands || directories;
    
    const list = (name, runners) => !name ? runners : ifNotFound(name, runners);
    
    let result;
    const error = tryCatch(() => {
        result = list(name, runners)
            .filter((runner) => {
                if (!name)
                    return runner;
               else
                    return name === runner.name;
            })
            .map((runner) => {
                const symbol = all ? '* ' : '';
                let column = `${symbol}${runner.name}`;
                
                if (all) {
                    if (commands)
                        column += `\n> ${runner.command}`;
                    
                    if (directories)
                        runner.directories.forEach((dir) => {
                            column += `\n|  ${dir}`;
                        });
                }
                
                return `${column}\n`
            }).join('');
    });
    
    fn(error, result);
};

