'use strict';

const os = require('os');
const path = require('path');

const writejson = require('writejson');

module.exports = async (runners) => {
    const longrunPath = path.join(os.homedir(), '.longrun.json');
    await writejson(longrunPath, runners);
};
