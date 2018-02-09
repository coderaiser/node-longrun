'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const writejson = require('writejson');

const home = os.homedir();
const longrunPath = path.join(home, '.longrun.json');

module.exports = (fn) => {
    readjson(longrunPath, (error, runners) => {
        if (!error)
            return fn(null, runners);
        
        if (error.code !== 'ENOENT')
            return fn(error);
        
        writejson(longrunPath, [], (error) => {
           fn(error, []);
        });
    });
};

