#!/usr/bin/env node

'use strict';

const argv = process.argv.slice(2);
const exit = process.exit;

if (/^-v|--version$/.test(argv)) {
    version();
    exit();
}

const currify = require('currify');
const waterfall = require('async/waterfall');
const squad = require('squad');
const apart = require('apart');
const tildify = require('tildify');

const read = require('../lib/read');
const write = require('../lib/write');

const readable = currify((name, argv) => {
    waterfall([read, apart(command, name, argv), logIfData], exitIfError);
});

const writable = currify((name, argv) => {
    waterfall([read, apart(command, name, argv), write], exitIfError);
});

const runnable = currify((name, argv) => {
    waterfall([read, apart(command, name, argv), run], exitIfError);
});

const cwd = squad(tildify, process.cwd);

const run = (emitter, cb) => {
    emitter
        .on('data', (data) => {
            process.stdout.write(data);
        })
        .on('error', (error) => {
            process.stderr.write(error.message);
        })
        .on('exit', () => {
            cb();
        });
};

const fail = currify((command, msg) => {
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
    
    let cmd = msg.replace('Unknown argument: ', '');
    
    if (cmd.length === 1)
        cmd = `-${cmd}`;
    else
        cmd = `--${cmd}`;
    
    console.error(`"${cmd}" is not a "${option}" option. See "${help}"`);
    process.exit(-1);
});

const yargs = require('yargs');
const parser = yargs
    .showHelpOnFail(false)
    .strict()
    .usage('usage: longrun [command] [options]')
    .command('init', 'Init runner', (yargs) => {
        return yargs.strict()
            .fail(fail('init'))
            .usage('usage: longrun init [name] [options]')
            .option('c', {
                alias: 'command',
                type: 'string',
                description: 'Command to execute'
            });
    }, writable('init'))
    .command('add', 'Add current directory to runner', (yargs) => {
        return yargs.usage('usage: longrun add [name] [options]')
            .option('l', {
                alias: 'list',
                type: 'boolean',
                description: 'show directory list of runner'
            })
            .option('L', {
                alias: 'list-all',
                type: 'boolean',
                description: 'show directory lists of all runners'
            })
            .fail(fail('add'));
    }, writable('add'))
    .command('run', 'Run commands from ~/.longrun.json', (yargs) => {
        return yargs.strict()
            .usage('usage: longrun run [name] [options]')
            .option('a', {
                alias: 'all',
                type: 'boolean',
                description: 'Run all runners'
            })
            .fail(fail('run'));
    }, runnable('run'))
    .command('remove', 'Remove current directory from runner', () => {
        return yargs.strict()
            .usage('usage: longrun remove [name] [options]')
            .option('l', {
                alias: 'list',
                type: 'boolean',
                description: 'show directory list of runner'
            })
            .option('L', {
                alias: 'list-all',
                type: 'boolean',
                description: 'show directory lists of all runners'
            })
            .fail(fail('remove'));
    }, writable('remove'))
    .command('clear', 'Clear directories list from runners', () => {
        return yargs.strict()
            .usage('usage: longrun clear [names] [options]')
            .fail(fail('clear'))
            .option('a', {
                alias: 'all',
                type: 'bool',
                description: 'Clear directories from all runners'
            })
            .option('l', {
                alias: 'list',
                type: 'boolean',
                description: 'show directory lists of all runners'
            })
            .option('L', {
                alias: 'list-all',
                type: 'boolean',
                description: 'show all runners'
            });
    }, writable('clear'))
    .command('list', 'List all runners', (yargs) => {
        return yargs.strict()
            .usage('usage: longrun list [options]')
            .fail(fail('list'))
            .option('a', {
                alias: 'all',
                type: 'bool',
                description: 'Show all information'
            })
            .option('d', {
                alias: 'directories',
                type: 'bool',
                description: 'Show directories'
            })
            .option('c', {
                alias: 'commands',
                type: 'bool',
                description: 'Show commands'
            });
    }, readable('list'))
    .command('finish', 'Remove runner(s)', (yargs) => {
        return yargs.strict()
            .fail(fail('finish'))
            .usage('usage: longrun finish [names] [options]')
            .option('a', {
                alias: 'all',
                type: 'boolean',
                description: 'Remove all runners'
            });
    }, writable('finish'))
    .option('v', {
        alias: 'version',
        type: 'boolean',
        description: 'Show version'
    })
    .option('h', {
        alias: 'help',
        type: 'boolean',
    })
    .help('h')
    .fail(fail(' '));

const args = parser.argv;
    
if (args.version)
    version();
else if (!args._.length)
    yargs.showHelp();

function getName(argv) {
    return argv._[1];
}

function getNames(argv) {
    return argv._.slice(1);
}

function command(cmd, argv, runners, cb) {
    const fn = require(`../lib/command/${cmd}`);
    
    fn(runners, options(cmd, argv), cb);
    
    if (/^(add|remove|clear)$/.test(cmd)) {
        if (argv.list)
            return readable('list', argv);
         
        if (argv.listAll) {
            readable('list', {
                _: ['list'],
                directories: true
            });
        }
    }
}

function options(cmd, argv) {
    const result = {
        name: getName(argv)
    };
    
    const assign = Object.assign;
    
    if (/^(clear|finish)$/.test(cmd))
        return {
            all: argv.all,
            names: getNames(argv) || []
        };
    
    if (/^(add|remove)$/.test(cmd))
        return assign(result, {
            cwd: cwd()
        });
    
    if (cmd === 'run')
        return assign(result, {
            all: argv.all
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
            cwd: cwd()
        });
}

function version() {
    console.log(`v${require('../package').version}`);
}

function crash(error) {
    const env = process.env;
    const msg = env.LONGRUN_DEV ? error : error.message;
    console.error(msg);
    process.exit(-1);
}

function exitIfError(error) {
    error && crash(error);
}

function logIfData(data) {
    data && process.stdout.write(data);
}

