'use strict';

const tryCatch = require('try-catch');

const directory = require('../lib/directory');
const test = require('supertape');

test('longrun: directory: add', (t) => {
    const runner = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun',
        ],
    }];
    
    const result = directory.add('master', '~', runner);
    const expect = runner.slice();
    
    expect[0].directories.push('~');
    
    t.deepEqual(result, expect, 'should add directory');
    t.end();
});

test('longrun: directory: add: name absent', (t) => {
    const runners = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun',
        ],
    }];
    
    const [error] = tryCatch(directory.add, 'patch', '~/longrun', runners);
    
    t.equal(error.message, 'name "patch" is absent in runners', 'should throw when name not found');
    t.end();
});

test('longrun: directory: remove', (t) => {
    const runner = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun',
        ],
    }];
    
    const result = directory.remove('master', '~/longrun', runner);
    const expect = runner.slice();
    
    expect[0].directories = [];
    
    t.deepEqual(result, expect, 'should remove directory');
    t.end();
});

test('longrun: directory: remove: directory absent', (t) => {
    const runners = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun',
        ],
    }];
    
    const [error] = tryCatch(directory.remove, 'master', '~/cloudcmd', runners);
    
    t.equal(error.message, 'current directory is absent in runner "master"', 'should throw when drectory not found');
    t.end();
});

test('longrun: directory: arguments: no name', (t) => {
    const [error] = tryCatch(directory.add);
    
    t.equal(error.message, 'name should be string!', 'should throw when no name');
    t.end();
});

test('longrun: directory: arguments: no directory', (t) => {
    const [error] = tryCatch(directory.add, 'hello');
    
    t.equal(error.message, 'directory should be string!', 'should throw when no directory');
    t.end();
});

test('longrun: directory: arguments: no runners', (t) => {
    const [error] = tryCatch(directory.add, 'hello', '~');
    
    t.equal(error.message, 'runners should be an array!', 'should throw when no runners');
    t.end();
});
