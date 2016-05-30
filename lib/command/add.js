'use strict';

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');
const apart = require('apart');
const tildify = require('tildify');

const find = require('../find');

const ifNotFound = currify((name, array) => {
    if (!find(name, array))
        throw Error(`runner with name "${name}" doesn\'t exist`);
     
    return array;
});

const addDir = currify((name, directory, array) => {
    array.filter((item) => name === item.name)
        .map((item) => item.directories)
        .forEach((directories) => {
            if (find(directory, directories))
                throw Error(`current directory already on a list`);
            
            directories.push(directory);
        });
    
    return array;
});

const cwd = squad(tildify, process.cwd);

module.exports = (argv, runners, fn) => {
    const name = argv._[1];
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    
    const add = squad.apply(null, [
        apart(writejson.sync, longrunPath),
        addDir(name, cwd()),
        ifNotFound(name),
        readjson.sync
    ]);
    
    let result;
    const error = tryCatch(() => {
        checkName(name);
        result = add(longrunPath);
    });
    
    fn(error, result);
};

function checkName(name) {
    if (!name)
        throw Error('name could not be empty');
}

