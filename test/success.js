'use strict';

const test = require('tape');
const success = require('../lib/success');
const sinon = require('sinon');

test('longrun: success: should set first argument null', (t) => {
    const fn = sinon.stub();
    
    success(fn, 'hello');
    t.ok(fn.calledWith(null, 'hello'));
    t.end();
});

test('longrun: success should use curry', (t) => {
    const fn = sinon.stub();
    
    t.equal(typeof success(fn), 'function', 'should return function');
    t.end();
});

