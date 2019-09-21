'use strict';

const currify = require('currify');
const tildify = require('tildify');

const success = require('../success');
const ifFound = require('../if-found');

const add = currify((name, command, cwd, array) => {
    return array.concat({
        name,
        command,
        directories: [
            cwd(),
        ],
    });
});

const checkName = currify(checkEmpty, 'name');
const checkCommand = currify(checkEmpty, 'command');

module.exports = (runners, options, fn) => {
    const {
        name,
        command,
    } = options;
    const cwd = () => tildify(options.cwd);
    
    Promise
        .resolve(runners)
        .then(checkName(name))
        .then(checkCommand(command))
        .then(ifFound(name))
        .then(add(name, command, cwd))
        .then(success(fn))
        .catch(fn);
};

function checkEmpty(name, variable, runners) {
    if (!variable)
        throw Error(`${name} could not be empty`);
    
    return runners;
}

