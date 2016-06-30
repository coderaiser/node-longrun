'use strict';

const longrun = require('..');

const Emitter = require('events').EventEmitter;

const test = require('tape');

test('longrun: arguments: no runners', (t) => {
    t.throws(longrun, /runItems should be an array!/, 'should throw when no runners');
    t.end();
});

test('longrun: result: emitter', (t) => {
    let emitter = longrun([]);
    
    t.ok(emitter instanceof Emitter, 'should return emitter');
    t.end();
});

test('longrun: events: exit when empty array', (t) => {
    let emitter = longrun([]);
    
    emitter.on('exit', () => {
        t.pass('longrun should emit "exit" event');
        t.end();
    });
});

test('longrun: events: exit when there is command to run', (t) => {
    let emitter = longrun([{
        command: 'whoami',
        directories: [
        __dirname
        ]
    }]);
    
    emitter.on('exit', () => {
        t.pass('longrun should emit "exit" event');
        t.end();
    });
});

test('longrun: events: data', (t) => {
    let emitter = longrun([{
        command: 'ls',
        directories: [
            __dirname
        ]
    }]);
    
    let wasData;
    emitter.on('data', () => {
        wasData = true;
    });
    
    emitter.on('exit', () => {
        t.ok(wasData, 'longrun should emit "data" event');
        t.end();
    });
});

test('longrun: events: error', (t) => {
    let emitter = longrun([{
        command: 'asdfsdfsdfsdf',
        directories: [
            __dirname
        ]
    }]);
    
    emitter.on('error', () => {
        t.pass('longrun should emit "error" event');
        t.end();
    });
});

test('longrun: a few runners', (t) => {
    let count = 0;
    
    const emitter = longrun([{
        command: 'ls',
        directories: [
            __dirname
        ]
    }, {
        command: 'ls',
        directories: [
            __dirname
        ]
    }]);
    
    emitter.on('data', () => {
        ++count;
    });
    
    emitter.on('exit', () => {
        t.equal(count, 2, 'data should be emitted twice');
        t.end();
    });
});
