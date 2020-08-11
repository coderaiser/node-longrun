'use strict';

const {promisify} = require('util');

const test = require('supertape');
const tryToCatch = require('try-to-catch');

const clear = promisify(require('../../lib/command/clear'));

test('longrun: clear directory to runner', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp'],
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: [],
    }];
    
    const runItem = {
        names: ['patch'],
    };
    
    const result = await clear(runners, runItem);
    
    t.deepEqual(result, expect, 'should clear directories from runner');
    t.end();
});

test('longrun: clear directory of runner: no name', async (t) => {
    const [error] = await tryToCatch(clear, [], {names: []});
    
    t.equal(error.message, 'name could not be empty', 'should throw when no name');
    t.end();
});

test('longrun: clear directory of runner: name doesn\'t exist', async (t) => {
    const item = {
        names: ['master'],
    };
    
    const [error] = await tryToCatch(clear, [], item);
    
    t.equal(error.message, 'runner with name "master" doesn\'t exist', 'should throw when name not found');
    t.end();
});

test('longrun: clear directory of runner: name is empty', async (t) => {
    const item = {
        names: [],
    };
    
    const [error] = await tryToCatch(clear, [], item);
    
    t.equal(error.message, 'name could not be empty', 'should throw when name is empty');
    t.end();
});

test('longrun: clear directories from all runners', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp'],
    }, {
        name: 'minor',
        command: 'wisdom monor',
        directories: ['~', '/tmp'],
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: [],
    }, {
        name: 'minor',
        command: 'wisdom monor',
        directories: [],
    }];
    
    const options = {
        all: true,
        names: [],
    };
    
    const result = await clear(runners, options);
    
    t.deepEqual(result, expect, 'result should be with no directories');
    t.end();
});

