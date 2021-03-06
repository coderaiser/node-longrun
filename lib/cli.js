'use strict';

const {callbackify} = require('util');

const apart = require('apart');
const currify = require('currify');
const waterfall = require('async/waterfall');
const tildify = require('tildify');
const squad = require('squad');

const read = callbackify(require('../lib/read'));
const write = callbackify(require('../lib/write'));

const cwd = squad(tildify, process.cwd);

const readable = currify((name, argv) => {
    waterfall([read, apart(command, name, argv), logIfData], exitIfError);
});

const writable = currify((name, argv) => {
    waterfall([read, apart(command, name, argv), write], exitIfError);
});

const runnable = currify((name, argv) => {
    waterfall([read, apart(command, name, argv), run], exitIfError);
});

module.exports.readable = readable;
module.exports.writable = writable;
module.exports.runnable = runnable;

module.exports.fail = currify((command, msg) => {
    if (command === ' ')
        command = '';
    
    let help;
    let option;
    
    if (command) {
        help = `longrun ${command} --help`;
        option = `longrun ${command}`;
    } else {
        help = 'longrun --help';
        option = 'longrun';
    }
    
    let cmd = msg.replace(/Unknown arguments?: /, '');
    
    if (cmd.length === 1)
        cmd = `-${cmd}`;
    else
        cmd = `--${cmd}`;
});

function command(cmd, argv, runners, cb) {
    const fn = require(`./command/${cmd}`);
    
    fn(runners, options(cmd, argv), cb);
    
    if (/^(add|remove|clear)$/.test(cmd)) {
        if (argv.list)
            return readable('list', argv);
        
        if (argv.listAll) {
            readable('list', {
                _: ['list'],
                directories: true,
            });
        }
    } else if (cmd === 'run' && argv.clear)
        writable('clear', argv);
}

function getName(argv) {
    return argv._[1];
}

function getNames(argv) {
    return argv._.slice(1);
}

function options(cmd, argv) {
    const result = {
        name: getName(argv),
    };
    
    const {assign} = Object;
    
    if (/^(clear|finish)$/.test(cmd))
        return {
            all: argv.all,
            names: getNames(argv) || [],
        };
    
    if (/^(add|remove)$/.test(cmd))
        return assign(result, {
            cwd: cwd(),
        });
    
    if (cmd === 'run')
        return assign(result, {
            all: argv.all,
        });
    
    if (cmd === 'list')
        return assign(result, {
            directories: argv.directories,
            commands: argv.commands,
            all: argv.all,
        });
    
    if (cmd === 'init')
        return assign(result, {
            command: argv.command,
            cwd: cwd(),
        });
}

const run = (emitter, cb) => {
    emitter
        .on('data', (data) => {
            process.stdout.write(data);
        })
        .on('error', (error) => {
            process.stderr.write(error.message);
        })
        .on('exit', cb);
};

function exitIfError(error) {
    error && crash();
}

function logIfData(data) {
    data && process.stdout.write(data);
}

function crash() {}

