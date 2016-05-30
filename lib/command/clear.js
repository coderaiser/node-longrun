'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const writejson = require('writejson');
const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const apart = require('apart');
const find = require('../find');

const ifNotFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

const clearDirs = currify((name, array) => {
    array.some((item) => {
        const is = name === item.name;
        
        if (is)
            item.directories = [];
        
        return is;
    });
    
    return array;
});

module.exports = (argv) => {
    const name = argv._[1];
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const clear = squad.apply(null, [
        apart(writejson.sync, longrunPath),
        clearDirs(name),
        ifNotFound(name),
        readjson.sync
    ]);
    
    const error = tryCatch(() => {
        checkName(name);
        clear(longrunPath);
    });
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

