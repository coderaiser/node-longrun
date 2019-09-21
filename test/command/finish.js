'use strict';

const finish = require('../../lib/command/finish');
const test = require('supertape');

test('longrun: finish runner', (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', '/tmp'],
    }];
    
    const expect = [];
    
    const runItem = {
        names: ['patch'],
    };
    
    finish(runners, runItem, (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'should finish directories from runner');
        t.end();
    });
});

test('longrun: finish runner: no name', (t) => {
    finish([], {names: []}, (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when no name');
        t.end();
    });
});

test('longrun: finish runner: name doesn\'t exist', (t) => {
    const item = {
        names: ['master'],
    };
    finish([], item, (error) => {
        t.equal(error.message, 'runner with name "master" doesn\'t exist', 'should throw when name not found');
        t.end();
    });
});

test('longrun: finish runner: name is empty', (t) => {
    const item = {
        names: [],
    };
    finish([], item, (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when name is empty');
        t.end();
    });
});

test('longrun: finish all runners', (t) => {
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
    
    finish(runners, options, (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'result should be with no runners');
        t.end();
    });
});
