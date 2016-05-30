'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const tildify = require('tildify');

const find = require('../find');
const cwd = squad(tildify, process.cwd);

const ifFound = currify((name, array) => {
    if (find(name, array))
        throw Error(`name "${name}" already exist`);
     
    return array;
});

const add = currify((name, command, directory, array) => {
    return array.concat({
        name,
        command,
        directories: [
            directory
        ]
    });
});

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const command = argv.command;
    const create = squad.apply(null, [
        add(name, command, cwd()),
        ifFound(name),
    ]);
    
    let result;
    
    const error = tryCatch(() => {
        checkName(name);
        checkCommand(argv.command);
        result = create(runners);
    });
    
    fn(error, result);
};

function checkCommand(command) {
    if (!command)
        throw Error('command could not be empty');
}

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

