'use strict';

const {
    once,
    EventEmitter,
} = require('events');

const longrun = require('..');

const test = require('supertape');

test('longrun: arguments: no runners', (t) => {
    t.throws(longrun, /runItems should be an array!/, 'should throw when no runners');
    t.end();
});

test('longrun: result: emitter', (t) => {
    const emitter = longrun([]);
    
    t.ok(emitter instanceof EventEmitter, 'should return emitter');
    t.end();
});

test('longrun: events: exit when empty array', async (t) => {
    const emitter = longrun([]);
    await once(emitter, 'exit');
    
    t.pass('longrun should emit "exit" event');
    t.end();
});

test('longrun: events: exit when there is command to run', async (t) => {
    const emitter = longrun([{
        command: 'whoami',
        directories: [__dirname],
    }]);
    
    await once(emitter, 'exit');
    
    t.pass('longrun should emit "exit" event');
    t.end();
});

test('longrun: events: error', async (t) => {
    const emitter = longrun([{
        command: 'asdfsdfsdfsdf',
        directories: [__dirname],
    }]);
    
    await once(emitter, 'error');
    
    t.pass('longrun should emit "error" event');
    t.end();
});

