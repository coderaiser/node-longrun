'use strict';

const {promisify} = require('util');

const test = require('supertape');
const tryToCatch = require('try-to-catch');

const finish = promisify(require('../../lib/command/finish'));

test('longrun: finish runner', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp'],
    }];
    
    const expect = [];
    
    const runItem = {
        names: ['patch'],
    };
    
    const result = await finish(runners, runItem);
    
    t.deepEqual(result, expect, 'should finish directories from runner');
    t.end();
});

test('longrun: finish runner: no name', async (t) => {
    const [error] = await tryToCatch(finish, [], {
        names: [],
    });
    
    t.equal(error.message, 'name could not be empty', 'should throw when no name');
    t.end();
});

test('longrun: finish runner: name doesn\'t exist', async (t) => {
    const item = {
        names: ['master'],
    };
    const [error] = await tryToCatch(finish, [], item);
    
    t.equal(error.message, 'runner with name "master" doesn\'t exist', 'should throw when name not found');
    t.end();
});

test('longrun: finish runner: name is empty', async (t) => {
    const item = {
        names: [],
    };
    const [error] = await tryToCatch(finish, [], item);
    
    t.equal(error.message, 'name could not be empty', 'should throw when name is empty');
    t.end();
});

test('longrun: finish all runners', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp'],
    }, {
        name: 'minor',
        command: 'wisdom monor',
        directories: ['~', '/tmp'],
    }];
    
    const expect = [];
    
    const options = {
        all: true,
        names: [],
    };
    
    const result = await finish(runners, options);
    
    t.deepEqual(result, expect, 'result should be with no runners');
    t.end();
});

