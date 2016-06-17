'use strict';

const tryCatch = require('try-catch');
const ifNotFound = require('../if-not-found');

module.exports = (argv, runners, fn) => {
    const all = argv.all;
    const name = argv.name;//._[1];
    
    let directories = argv.directories;
    let commands = argv.commands;
    
    if (name && !commands && !directories)
        commands = directories = true;
    
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
            .filter((runner) => {
                if (all)
                    return true;
                
                if (directories)
                    return runner.directories.length;
                
                if (commands)
                    return runner.command;
               
                return true;
            })
            .map((runner) => {
                const symbol = all || commands || directories ? '* ' : '';
                let column = `${symbol}${runner.name}`;
                
                if (commands || !name && all)
                    column += `\n> ${runner.command || ''}`;
                    
                if (directories || !name && all)
                    runner.directories
                        .forEach((dir) => {
                            column += `\n|  ${dir}`;
                        });
                
                return `${column}\n`;
            }).join('');
    });
    
    fn(error, result);
};

