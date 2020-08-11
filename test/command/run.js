'use strict';

const {promisify} = require('util');

const test = require('supertape');
const tryToCatch = require('try-to-catch');

const run = promisify(require('../../lib/command/run'));

test('longrun: run', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~'],
    }];
    
    const runItem = {
        name: 'patch',
    };
    
    const [error] = await tryToCatch(run, runners, runItem);
    
    t.notOk(error, 'should not be error');
    t.end();
});

test('longrun: run: --all', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~'],
    }, {
        name: 'master',
        command: 'echo master',
        directories: ['~'],
    }];
    
    const runItem = {
        name: '',
        all: true,
    };
    
    const [error] = await tryToCatch(run, runners, runItem);
    
    t.notOk(error, 'should not be error');
    t.end();
});

test('longrun: run: error: empty name', async (t) => {
    const runItem = {
        name: '',
    };
    
    const [error] = await tryToCatch(run, [], runItem);
    
    t.equal(error.message, 'name could not be empty');
    t.end();
});

test('longrun: run: error', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'echo patch',
        directories: ['~'],
    }];
    
    const runItem = {
        name: 'no name',
    };
    
    const [error] = await tryToCatch(run, runners, runItem);
    
    t.equal(error.message, 'runner with name "no name" doesn\'t exist');
    t.end();
});

