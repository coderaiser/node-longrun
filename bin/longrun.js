#!/usr/bin/env node

const argv = process.argv.slice(2);
const exit = process.exit;

if (/^-v|--version$/.test(argv)) {
    version();
    exit();
}

const currify = require('currify');

function get(name) {
    return (argv) => {
        require(`../lib/command/${name}`)(argv);
    }
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
            .fail(fail('run'))
            .usage('usage: longrun init [name] [options]')
            .option('c', {
                alias: 'command',
                type: 'string',
                description: 'Command to execute'
            })
    }, get('init'))
    .command('add', 'Add current directory to runner', (yargs) => {
        return yargs.usage('usage: longrun add [name]');
    }, get('add'))
    .command('run', 'Run commands from ~/.longrun.json', (yargs) => {
        return yargs.strict()
            .fail(fail('run'))
            .usage('usage: longrun run [name]');
    }, get('run'))
    .command('remove', 'Remove current directory from runner', (argv) => {
        return yargs.strict()
            .fail(fail('remove'))
            .usage('usage: longrun remove [name]');
    }, get('remove'))
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
    .command('fin', 'Remove runner(s)', (yargs) => {
        return yargs.strict()
            .fail(fail('fin'))
            .usage('usage: longrun init [name] [options]')
    }, get('fin'))
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

function version() {
    console.log(`v${require('../package.json').version}`);
}

function crash(error) {
    console.error(error.message);
    process.exit(-1);
}

function exitIfError(error) {
    error && crash(error);
}

