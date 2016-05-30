'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const writejson = require('writejson');

module.exports = (fn) => {
    const home = os.homedir();
    const longrunPath = path.join(home, '.longrun.json');
    
    readjson(longrunPath, (error, runners) => {
        if (!error)
            fn(null, runners);
        else if (error.code !== 'ENOENT')
            fn(error);
        else
            writejson(longrunPath, [], (error) => {
               fn(error, []);
            });
    });
};

