'use strict';

const Emitter = require('events').EventEmitter;

const tryCatch = require('try-catch');
const squad = require('squad');
const currify = require('currify');

const longrun = require('../longrun');

const filterIf = currify((name, array) => {
    return !name ? array : array.filter((item) => {
        return name === item.name;
    });
});

const ifNotFound = currify((name, array) => {
    if (name && !array.length)
        throw Error(`name "${name}" is absent in runners`);
    
    return array;
});

module.exports = (argv, runners, fn) => {
    const emitter = new Emitter();
    const name = argv._[1];
    const run = squad.apply(null, [
        longrun,
        ifNotFound(name),
        filterIf(name)
    ]);
    
    const error = tryCatch(() => {
        run(runners)
            .on('data', (data) => {
                emitter.emit('data', data);
            })
            .on('error', (error) => {
                emitter.emit('data', error);
            });
    });
    
    fn(error, emitter);
};

