'use strict';

const directory = require('../lib/directory');
const test = require('tape');

test('longrun: directory: add', (t) => {
    const runner =[{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun'
        ]
    }];
    
    const result = directory.add('master', '~', runner);
    const expect = runner.slice();
    
    expect[0].directories.push('~');
    
    t.deepEqual(result, expect, 'should add directory');
    t.end();
});

test('longrun: directory: add: can not find', (t) => {
    const runners = [{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun'
        ]
    }];
    
    const fn = () => directory.add('patch', '~/longrun', runners);
    
    t.throws(fn, /name "patch" is absent in runners/, 'should throw when name not found');
    t.end();
});

test('longrun: directory: remove', (t) => {
    const runner =[{
        name: 'master',
        command: 'git push origin master',
        directories: [
            '~/longrun'
        ]
    }];
    
    const result = directory.remove('master', '~/longrun', runner);
    const expect = runner.slice();
    
    expect[0].directories = [];
    
    t.deepEqual(result, expect, 'should remove directory');
    t.end();
});

test('longrun: directory: arguments: no name', (t) => {
    const fn = () => directory.add();
    
    t.throws(fn, /name should be string!/, 'should throw when no name');
    t.end();
});

test('longrun: directory: arguments: no directory', (t) => {
    const fn = () => directory.add('hello');
    
    t.throws(fn, /directory should be string!/, 'should throw when no directory');
    t.end();
});

test('longrun: directory: arguments: no runners', (t) => {
    const fn = () => directory.add('hello', '~');
    
    t.throws(fn, /runners should be an array!/, 'should throw when no runners');
    t.end();
});
