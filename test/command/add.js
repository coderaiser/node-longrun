'use strict';

const {promisify} = require('util');

const test = require('supertape');
const tildify = require('tildify');
const squad = require('squad');
const tryToCatch = require('try-to-catch');

const add = promisify(require('../../lib/command/add'));

const cwd = squad(tildify, process.cwd);
const DIR = cwd();

test('longrun: add directory to runner', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~'],
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', DIR],
    }];
    
    const runItem = {
        name: 'patch',
        cwd: DIR,
    };
    
    const result = await add(runners, runItem);
    
    t.deepEqual(result, expect, 'should add directory to runner');
    t.end();
});

test('longrun: add directory to runner', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', DIR],
    }];
    
    const runItem = {
        name: 'patch',
        cwd: DIR,
    };
    
    const [error] = await tryToCatch(add, runners, runItem);
    
    t.equal(error && error.message, 'current directory already in runner "patch"', 'should return error');
    t.end();
});

test('longrun: add directory to runner: no name', async (t) => {
    const [error] = await tryToCatch(add, [], {});
    
    t.equal(error.message, 'name could not be empty', 'should throw when no name');
    t.end();
});

