'use strict';

const currify = require('currify');

const success = require('../success');
const ifNotFound = require('../if-not-found');
const id = (a) => a;

const byName = currify(filterByName);
const byType = currify(filterByType);
const list = currify(listRunners);

module.exports = (runners, argv, fn) => {
    const {
        all,
        name,
    } = argv;
    
    let {
        directories,
        commands,
    } = argv;
    
    if (name && !commands && !directories)
        commands = directories = true;
    
    const isFound = !name ? id : ifNotFound(name);
    
    Promise.resolve(runners)
        .then(isFound)
        .then(byName(name))
        .then(byType(name, all, directories, commands))
        .then(list(name, all, directories, commands))
        .then(success(fn))
        .catch(fn);
};

function filterByName(name, runners) {
    return runners.filter((runner) => {
        if (!name)
            return runner;
        
        return name === runner.name;
    });
}

function filterByType(name, all, directories, commands, runners) {
    return runners
        .filter((runner) => {
            if (all || name)
                return true;
            
            if (directories)
                return runner.directories.length;
            
            if (commands)
                return runner.command;
            
            return true;
        });
}

function listRunners(name, all, directories, commands, runners) {
    return runners.map((runner) => {
        const symbol = all || commands || directories ? '* ' : '';
        let column = `${symbol}${runner.name}`;
        
        if (commands || !name && all)
            column += `\n> ${runner.command || ''}`;
        
        if (directories || !name && all)
            for (const dir of runner.directories) {
                column += `\n|  ${dir}`;
            }
        
        return `${column}\n`;
    }).join('');
}
