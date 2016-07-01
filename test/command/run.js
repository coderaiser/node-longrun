'use strict';

const run = require('../../lib/command/run');
const test = require('tape');

test('longrun: run: error', (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~']
    }];
    
    const runItem = {
        name: 'no name'
    }
    
    run(runners, runItem, (error, runner) => {
        t.equal(error.message, 'runner with name "no name" doesn\'t exist');
        t.end();
    });
});

