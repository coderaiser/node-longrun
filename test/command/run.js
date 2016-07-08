'use strict';

const run = require('../../lib/command/run');
const test = require('tape');

test('longrun: run', (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~']
   }];
   
    const runItem = {
        name: 'patch'
    };
    
    run(runners, runItem, (error) => {
        t.notOk(error, 'should not be error');
        t.end();
    });
});

test('longrun: run: --all', (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~']
    }, {
        name: 'master',
        command: 'echo master',
        directories: ['~']
    }];
    
    const runItem = {
        name: '',
        all: true
    };
    
    run(runners, runItem, (error) => {
        t.notOk(error, 'should not be error');
        t.end();
    });
});

test('longrun: run: error', (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~']
    }];
    
    const runItem = {
        name: 'no name'
    };
    
    run(runners, runItem, (error) => {
        t.equal(error.message, 'runner with name "no name" doesn\'t exist');
        t.end();
    });
});

