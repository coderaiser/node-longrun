'use strict';

const clear = require('../../lib/command/clear');
const test = require('tape');

test('longrun: clear directory to runner', (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp']
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: []
    }];
    
    const runItem = {
        names: ['patch']
    };
    
    clear(runners, runItem, (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'should clear directories from runner');
        t.end();
    });
});

test('longrun: clear directory of runner: no name', (t) => {
    clear([], {names: []}, (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when no name');
        t.end();
    });
});

test('longrun: clear directory of runner: name doesn\'t exist', (t) => {
    const item = {
        names: ['master']
    };
    clear([], item, (error) => {
        t.equal(error.message, 'runner with name "master" doesn\'t exist', 'should throw when name not found');
        t.end();
    });
});

test('longrun: clear directory of runner: name is empty', (t) => {
    const item = {
        names: []
    };
    clear([], item, (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when name is empty');
        t.end();
    });
});

test('longrun: clear directories from all runners', (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp']
    }, {
        name: 'minor',
        command: 'wisdom monor',
        directories: ['~', '/tmp']
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: []
    }, {
        name: 'minor',
        command: 'wisdom monor',
        directories: []
    }];
    
    const options = {
        all: true,
        names: []
    };
    
    clear(runners, options, (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'result should be with no directories');
        t.end();
    });
});
