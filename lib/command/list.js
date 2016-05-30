'use strict';

const tryCatch = require('try-catch');

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const directories = name || argv.all || argv.directories;
    const commands = name || argv.all || argv.commands;
    const all = name || argv.all || commands || directories;
    
    let result = '';
    
    const error = tryCatch(() => {
        runners
            .filter((runner) => {
                if (!name)
                    return runner;
               else
                    return name === runner.name;
            })
            .forEach((runner) => {
                const symbol = all ? '* ' : '';
                result += `${symbol}${runner.name}\n`;
                
                if (all) {
                    if (commands)
                        result += `> ${runner.command}\n`;
                    
                    if (directories)
                        runner.directories.forEach((dir) => {
                            result += `|  ${dir}\n`;
                        });
                }
            });
    });
    
    fn(error, result);
};

