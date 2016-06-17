'use strict';

const remove = require('../../lib/command/remove');
const test = require('tape');
const tildify = require('tildify');
const squad = require('squad');

const cwd = squad(tildify, process.cwd);
const DIR = cwd();

test('longrun: remove directory to runner', (t) => {
    const runners = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~', DIR]
    }];
    
    const expect = [{
        name: 'patch',
        command: 'wisdom patch',
        directories: ['~']
    }];
    
    const runItem = {
        name: 'patch',
        cwd: DIR
    };
    
    remove(runners, runItem, (error, result) => {
        t.notOk(error, 'should not be error');
        t.deepEqual(result, expect, 'should remove directory from runner');
        t.end();
    });
});

test('longrun: remove directory of runner: no name', (t) => {
    remove([], {}, (error) => {
        t.equal(error.message, 'name could not be empty', 'should throw when no name');
        t.end();
    });
});

test('longrun: remove directory of runner: name doesn\'t exist', (t) => {
    const item = {
        name: 'master'
    };
    remove([], item, (error) => {
        t.equal(error.message, 'runner with name "master" doesn\'t exist', 'should throw when name not found');
        t.end();
    });
});

