'use strict';

const {promisify} = require('util');

const test = require('supertape');
const tildify = require('tildify');
const squad = require('squad');
const tryToCatch = require('try-to-catch');

const remove = promisify(require('../../lib/command/remove'));

const cwd = squad(tildify, process.cwd);
const DIR = cwd();

test('longrun: remove directory of runner', async (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', DIR],
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~'],
    }];
    
    const runItem = {
        name: 'patch',
        cwd: DIR,
    };
    
    const result = await remove(runners, runItem);
    
    t.deepEqual(result, expect, 'should remove directory from runner');
    t.end();
});

test('longrun: remove directory of runner: no name', async (t) => {
    const [error] = await tryToCatch(remove, [], {});
    
    t.equal(error.message, 'name could not be empty', 'should throw when no name');
    t.end();
});

test('longrun: remove directory of runner: name doesn\'t exist', async (t) => {
    const item = {
        name: 'master',
    };
    
    const [error] = await tryToCatch(remove, [], item);
    
    t.equal(error.message, 'runner with name "master" doesn\'t exist', 'should throw when name not found');
    t.end();
});

