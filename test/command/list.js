'use strict';

const list = require('../../lib/command/list');
const test = require('tape');

const runners = [{
    name: 'patch',
    command: 'wisdom patch',
    directories: ['~']
}, {
    name: 'minor',
    command: 'wisdom minor',
    directories: ['~']
}];

test('longrun: list names of runners', (t) => {
    const names = [
        'patch',
        'minor'
    ];
    
    const expect = names
        .map((name) => `${name}\n`)
        .join('');
    
    list(runners, {}, (error, result) => {
        t.notOk(error, 'should not be error');
        t.equal(expect, result, 'should list names of runner');
        t.end();
    });
});

test('longrun: list directories of runners', (t) => {
    const expect = [
        '* patch',
        '|  ~',
        '* minor',
        '|  ~'
        ].join('\n') + '\n';
    
    list(runners, {directories: true}, (error, result) => {
        t.equal(expect, result, 'should list directories of runners');
        t.end();
    });
});

test('longrun: list commands of runners', (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
        '* minor',
        '> wisdom minor'
        ].join('\n') + '\n';
    
    list(runners, {commands: true}, (error, result) => {
        t.equal(expect, result, 'should list commands of runners');
        t.end();
    });
});

test('longrun: list all runners', (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
        '|  ~',
        '* minor',
        '> wisdom minor',
        '|  ~'
        ].join('\n') + '\n';
    
    list(runners, {all: true}, (error, result) => {
        t.equal(expect, result, 'should list all runners');
        t.end();
    });
});

test('longrun: list runner', (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
        '|  ~',
        ].join('\n') + '\n';
    
    list(runners, {name: 'patch'}, (error, result) => {
        t.equal(expect, result, 'should list runner');
        t.end();
    });
});

test('longrun: list directory of runner', (t) => {
    const expect = [
        '* patch',
        '|  ~',
        ].join('\n') + '\n';
    
    list(runners, {name: 'patch', directories: true}, (error, result) => {
        t.equal(expect, result, 'should list runner');
        t.end();
    });
});

test('longrun: list command of runner', (t) => {
    const expect = [
        '* patch',
        '> wisdom patch',
        ].join('\n') + '\n';
    
    list(runners, {name: 'patch', commands: true}, (error, result) => {
        t.equal(expect, result, 'should list command of runner');
        t.end();
    });
});
