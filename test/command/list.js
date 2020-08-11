'use strict';

const {promisify} = require('util');

const test = require('supertape');

const list = promisify(require('../../lib/command/list'));

const runners = [{
    name: 'patch',
    command: 'wisdom patch',
    directories: ['~'],
}, {
    name: 'minor',
    command: 'wisdom minor',
    directories: ['~'],
}];

test('longrun: list names of runners', async (t) => {
    const names = [
        'patch',
        'minor',
    ];
    
    const expect = names
        .map((name) => `${name}\n`)
        .join('');
    
    const result = await list(runners, {});
    
    t.equal(result, expect, 'should list names of runner');
    t.end();
});

test('longrun: list directories of runners', async (t) => {
    const expect = [
        '* patch',
        '|  ~',
        '* minor',
        '|  ~',
    ].join('\n') + '\n';
    
    const result = await list(runners, {directories: true});
    
    t.equal(expect, result, 'should list directories of runners');
    t.end();
});

test('longrun: list commands of runners', async (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
        '* minor',
        '> wisdom minor',
    ].join('\n') + '\n';
    
    const result = await list(runners, {
        commands: true,
    });
    
    t.equal(expect, result, 'should list commands of runners');
    t.end();
});

test('longrun: list all runners', async (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
        '|  ~',
        '* minor',
        '> wisdom minor',
        '|  ~',
    ].join('\n') + '\n';
    
    const result = await list(runners, {
        all: true,
    });
    
    t.equal(expect, result, 'should list all runners');
    t.end();
});

test('longrun: list runner', async (t) => {
    const expect = [
        '* minor',
        '> wisdom minor',
        '|  ~',
    ].join('\n') + '\n';
    
    const result = await list(runners, {
        name: 'minor',
    });
    
    t.equal(result, expect, 'should list runner');
    t.end();
});

test('longrun: list directory of runner', async (t) => {
    const expect = [
        '* patch',
        '|  ~',
    ].join('\n') + '\n';
    
    const result = await list(runners, {
        name: 'patch',
        directories: true,
    });
    
    t.equal(expect, result, 'should list runner');
    t.end();
});

test('longrun: list command of runner', async (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
    ].join('\n') + '\n';
    
    const result = await list(runners, {name: 'patch', commands: true});
    
    t.equal(expect, result, 'should list command of runner');
    t.end();
});

