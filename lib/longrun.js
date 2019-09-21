'use strict';

const runny = require('runny');
const eachSeries = require('itchy');
const Emitter = require('events').EventEmitter;
const currify = require('currify');

const on = currify((event, emitter, data) => {
    emitter.emit(event, data);
});

module.exports = (runItems) => {
    check(runItems);
    
    const emitter = new Emitter();
    
    setImmediate(() => {
        run(runItems, {
            onError: on('error', emitter),
            onData: on('data', emitter),
            onExit: on('exit', emitter),
        });
    });
    
    return emitter;
};

function check(runners) {
    if (!Array.isArray(runners)) {
        throw Error('runItems should be an array!');
    }
}

function run(runItems, funcs) {
    const {
        onError,
        onData,
        onExit,
    } = funcs;
    
    eachSeries(runItems, (item, fn) => {
        const {
            command,
            directories,
        } = item;
        
        const runner = runny(command, directories)
            .on('error', onError)
            .on('data', onData)
            .once('exit', () => {
                runner.removeListener('error', onError);
                runner.removeListener('data', onData);
                fn();
            });
    }, onExit);
}

