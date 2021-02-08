'use strict';

const test = require('supertape');
const success = require('../lib/success');
const stub = require('@cloudcmd/stub');

test('longrun: success: should set first argument null', (t) => {
    const fn = stub();
    
    success(fn, 'hello');
    t.calledWith(fn, [null, 'hello']);
    t.end();
});

test('longrun: success should use curry', (t) => {
    const fn = stub();
    
    t.equal(typeof success(fn), 'function', 'should return function');
    t.end();
});

