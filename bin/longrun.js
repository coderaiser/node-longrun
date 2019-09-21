#!/usr/bin/env node

'use strict';

const args = process.argv.slice(2);
const {exit} = process;

if (/^-v|--version$/.test(args)) {
    version();
    exit();
}

const parser = require('../lib/parser');
const {argv} = parser;

if (argv.version)
    version();
else if (!argv._.length)
    parser.showHelp();

function version() {
    console.log(`v${require('../package').version}`);
}

