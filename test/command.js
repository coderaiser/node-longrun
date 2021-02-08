'use strict';

const tryCatch = require('try-catch');

const command = require('../lib/command');
const test = require('supertape');

test('longrun: command', (t) => {
    const runner = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun',
        ],
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
            '~/longrun',
        ],
    }];
    
    const [error] = tryCatch(command, 'patch', 'wisdom patch', runner);
    t.ok(error, 'should throw when name not found');
    t.end();
});

test('longrun: command: arguments: no name', (t) => {
    const fn = command;
    
    const [error] = tryCatch(fn);
    
    t.equal(error.message, 'name should be string!', 'should throw when no name');
    t.end();
});

test('longrun: command: arguments: no command', (t) => {
    const [error] = tryCatch(command, 'hello');
    
    t.equal(error.message, 'command should be string!', 'should throw when no command');
    t.end();
});

test('longrun: command: arguments: no runners', (t) => {
    const [error] = tryCatch(command, 'hello', 'wisdom patch');
    
    t.equal(error.message, 'runners should be an array!', 'should throw when no runners');
    t.end();
});

