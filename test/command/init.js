'use strict';

const {promisify} = require('util');

const test = require('supertape');
const tildify = require('tildify');
const squad = require('squad');
const tryToCatch = require('try-to-catch');

const init = promisify(require('../../lib/command/init'));

const cwd = squad(tildify, process.cwd);

test('longrun: init runner', async (t) => {
    const runners = [];
    const options = {
        name: 'patch',
        command: 'wisdom patch',
        cwd: cwd(),
    };
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: [cwd()],
    }];
    
    const result = await init(runners, options);
    
    t.deepEqual(result, expect, 'should init new runner');
    t.end();
});

test('longrun: init runner: no name', async (t) => {
    const runners = [];
    const options = {
        name: '',
        command: 'wisdom patch',
    };
    
    const [error] = await tryToCatch(init, runners, options);
    
    t.equal(error.message, 'name could not be empty', 'should throw when no name');
    t.end();
});

test('longrun: init runner: no command', async (t) => {
    const runners = [];
    const options = {
        name: 'patch',
    };
    
    const [error] = await tryToCatch(init, runners, options);
    
    t.equal(error.message, 'command could not be empty', 'should throw when command empty');
    t.end();
});

test('longrun: init runner: name exist', async (t) => {
    const options = {
        name: 'patch',
        command: 'wisdom patch',
    };
    
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: [cwd()],
    }];
    
    const [error] = await tryToCatch(init, runners, options);
    
    t.equal(error.message, 'runner with name "patch" already exist', 'should throw when name exist');
    t.end();
});

