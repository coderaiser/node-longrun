#!/usr/bin/env node

const argv = process.argv.slice(2);
const exit = process.exit;

if (/^-v|--version$/.test(argv)) {
    version();
    exit();
}
const Emitter = require('events').EventEmitter;

const currify = require('currify');
const waterfall = require('async/waterfall');
const squad = require('squad');
const apart = require('apart');
const tildify = require('tildify');

const read = require('../lib/read');
const write = require('../lib/write');

const cwd = squad(tildify, process.cwd);

const pipeline = (argv, options, fn) => {
    waterfall([
        (cb) => read(cb),
        (data, cb) => {
            fn(argv, data, cb);
        },
        (data, cb) => {
            if (!options.readOnly)
                write(data, cb)
            else
                cb(null, logIfData(data))
        }
    ], exitIfError);
};

function get(name) {
    return (argv) => {
        const command  = require(`../lib/command/${name}`);
        const options = {
            readOnly: name === 'list'
        };
        
        pipeline(argv, options, command);
    }
}

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
}

const fail = currify((command, msg) => {
    command = command || '';
    
    if (command)
        command += ' ';
    
    const cmd = msg.replace('Unknown argument: ', '');
    console.error(`"${cmd}" is not a longrun option. See "longrun ${command}--help"`);
    process.exit(-1);
});

const yargs = require('yargs');
const args = yargs
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
            })
    }, get('init'))
    .command('add', 'Add current directory to runner', (yargs) => {
        return yargs.usage('usage: longrun add [name]');
    }, (argv) => {
        waterfall([read, apart(command, 'add', argv), write], exitIfError);
    })
    .command('run', 'Run commands from ~/.longrun.json', (yargs) => {
        return yargs.strict()
            .usage('usage: longrun run [name] [options]')
            .option('a', {
                alias: 'all',
                type: 'boolean',
                description: 'Run all runners'
            })
            .fail(fail('run'))
    }, (argv) => {
        waterfall([read, apart(command, 'run', argv), run], exitIfError);
    })
    .command('remove', 'Remove current directory from runner', (argv) => {
        return yargs.strict()
            .fail(fail('remove'))
            .usage('usage: longrun remove [name]');
    }, (argv) => {
        waterfall([read, apart(command, 'remove', argv), write], exitIfError);
    })
    .command('clear', 'Clear directories list from runner', (argv) => {
        return yargs.strict()
            .fail(fail('clear'))
            .usage('usage: longrun clear[name]');
    }, get('clear'))
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
            })
    }, get('list'))
    .command('finish', 'Remove runner(s)', (yargs) => {
        return yargs.strict()
            .fail(fail('finish'))
            .usage('usage: longrun init [name] [options]')
    }, get('finish'))
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
    .fail(fail(' '))
    .argv;

if (args.version)
    version();
else if (!args._.length)
    yargs.showHelp();

function getName(argv) {
    return argv._[1];
}

function command(cmd, argv, runners, cb) {
    const fn = require(`../lib/command/${cmd}`);
    const runner = {
        name: getName(argv),
        cwd: cwd()
    };
    
    if (typeof argv.all !== 'undefined')
        runner.all = argv.all;
    
    fn(runners, cb, runner);
}

function version() {
    console.log(`v${require('../package.json').version}`);
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

