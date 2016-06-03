'use strict';

const init = require('../../lib/command/init');
const test = require('tape');
const tildify = require('tildify');
const squad = require('squad');

const cwd = squad(tildify, process.cwd);

test('longrun: init runner', (t) => {
    const argv = {
        _: ['', 'patch'],
        command: 'wisdom patch'
    };
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: [cwd()]
    }];
    
    init(argv, [], (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'should init new runner');
        t.end();
    });
});

test('longrun: init runner: no name', (t) => {
    const argv = {
        _: [],
        command: 'wisdom patch'
    };
    
    init(argv, [], (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when no name');
        t.end();
    });
});

test('longrun: init runner: no command', (t) => {
    const argv = {
        _: ['', 'patch']
    };
    
    init(argv, [], (error) => {
        t.equal(error.message, 'command could not be empty', 'should throw when command empt');
        t.end();
    });
});

test('longrun: init runner: name exist', (t) => {
    const argv = {
        _: ['', 'patch'],
        command: 'wisdom patch'
    };
    
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: [cwd()]
    }];
    
    init(argv, runners, (error) => {
        t.equal(error.message, 'runner with name "patch" already exist', 'should throw when name exist');
        t.end();
    });
});
