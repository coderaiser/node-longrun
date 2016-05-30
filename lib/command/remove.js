'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const tildify = require('tildify');

const find = require('../find');
const exclude = require('../exclude');

const ifNotFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

const removeDir = currify((name, directory, array) => {
    const item = array.filter((item) => {
        return name === item.name;
    })[0];
    
    item.directories = exclude(directory, item.directories);
    
    return array;
});

const cwd = squad(tildify, process.cwd);

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const remove = squad.apply(null, [
        removeDir(name, cwd()),
        ifNotFound(name),
    ]);
    
    let result;
    const error = tryCatch(() => {
        checkName(name);
        result = remove(runners);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

