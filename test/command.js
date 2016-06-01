'use strict';

const command = require('../lib/command');
const test = require('tape');

test('longrun: command', (t) => {
    const runner = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun'
        ]
    }];
    
    const result = command('master', 'wisdom patch', runner);
    const expect = runner.slice();
    
    expect[0].command = 'wisdom patch';
    
    t.deepEqual(result, expect, 'should update command');
    t.end();
});

test('longrun: command: can not find', (t) => {
    const runner = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun'
        ]
    }];
    
    const fn = () => command('patch', 'wisdom patch', runner);
    t.throws(fn, 'should throw when name not found');
    t.end();
});

test('longrun: command: arguments: no name', (t) => {
    const fn = () => command();
    
    t.throws(fn, /name should be string!/, 'should throw when no name');
    t.end();
});

test('longrun: command: arguments: no command', (t) => {
    const fn = () => command('hello');
    
    t.throws(fn, /command should be string!/, 'should throw when no command');
    t.end();
});

test('longrun: command: arguments: no runners', (t) => {
    const fn = () => command('hello', 'wisdom patch');
    
    t.throws(fn, /runners should be an array!/, 'should throw when no runners');
    t.end();
});

