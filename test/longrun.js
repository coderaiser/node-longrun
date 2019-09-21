'use strict';

const longrun = require('..');

const Emitter = require('events').EventEmitter;

const test = require('supertape');

test('longrun: arguments: no runners', (t) => {
    t.throws(longrun, /runItems should be an array!/, 'should throw when no runners');
    t.end();
});

test('longrun: result: emitter', (t) => {
    const emitter = longrun([]);
    
    t.ok(emitter instanceof Emitter, 'should return emitter');
    t.end();
});

test('longrun: events: exit when empty array', (t) => {
    const emitter = longrun([]);
    
    emitter.on('exit', () => {
        t.pass('longrun should emit "exit" event');
        t.end();
    });
});

test('longrun: events: exit when there is command to run', (t) => {
    const emitter = longrun([{
        command: 'whoami',
        directories: [
            __dirname,
        ],
    }]);
    
    emitter.on('exit', () => {
        t.pass('longrun should emit "exit" event');
        t.end();
    });
});

test('longrun: events: error', (t) => {
    const emitter = longrun([{
        command: 'asdfsdfsdfsdf',
        directories: [
            __dirname,
        ],
    }]);
    
    emitter.on('error', () => {
        t.pass('longrun should emit "error" event');
        t.end();
    });
});

