'use strict';

const os = require('os');
const path = require('path');

const writejson = require('writejson');

module.exports = (runners, fn) => {
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    writejson(longrunPath, runners, fn);
};
