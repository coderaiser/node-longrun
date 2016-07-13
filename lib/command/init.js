'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const tildify = require('tildify');

const ifFound = require('../if-found');

const add = currify((name, command, cwd, array) => {
    return array.concat({
        name,
        command,
        directories: [
            cwd()
        ]
    });
});

module.exports = (runners, options, fn) => {
    const name = options.name;
    const command = options.command;
    const cwd = () => tildify(options.cwd);
    
    const create = squad.apply(null, [
        add(name, command, cwd),
        ifFound(name),
    ]);
    
    let result;
    
    const error = tryCatch(() => {
        checkName(name);
        checkCommand(command);
        result = create(runners);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

function checkCommand(command) {
    if (!command)
        throw Error('command could not be empty');
}

