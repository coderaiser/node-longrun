'use strict';

const os = require('os');
const path = require('path');

const readjson = require('readjson');
const writejson = require('writejson');

const home = os.homedir();
const longrunPath = path.join(home, '.longrun.json');

module.exports = async (fn) => {
    await [error, runners] = tryToCatch(readjson, longrunPath);
    
    if (!error)
        return runners;
        
    if (error.code !== 'ENOENT')
        throw error;
    
    return await writejson(longrunPath, []);
};

