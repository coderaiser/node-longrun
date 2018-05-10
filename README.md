# Longrun [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Run set of commands in group of directories. Based on [runny](https://github.com/coderaiser/node-runny "Runny").

![Logo][LogoURL]


## Install

`npm i longrun -g`

## How to use?

```
$ longrun
usage: longrun [command] [options]

Commands:
  init    Init runner
  add     Add current directory to runner
  run     Run commands from ~/.longrun.json
  remove  Remove current directory from runner
  list    List all runners
  clear   Clear directories list from runners
  finish  Remove runner(s)

Options:
  -v, --version  Show version  [boolean]
  -h, --help     Show help  [boolean]
```

## Use example

First thing first, you should init new runner:

```sh
$ longrun init master -c "pwd"
```

Lets list what we have in `master` runner:

```sh
$ longrun list master
* master
> pwd
|  ~/longrun
```

Great. Now lets add another directory:

```sh
$ cd ../cloudcmd
$ longrun add master
$ longrun list master
* master
> pwd
|  ~/longrun
|  ~/cloudcmd
```

Now we can execute `master` runner with:

```sh
$ longrun run master
/home/coderaiser/longrun
/home/coderaiser/cloudcmd
```

Nice! Lets add one more runner to make things more fun:

```sh
$ longrun init who -c whoami
$ longrun list
master
who
```

And execute it:

```sh
$ longrun run -a
/home/coderaiser/longrun
/home/coderaiser/cloudcmd
coderaiser
```

As you see you can add as much runners as you wish, and run one or all of them.

## How it works?

From the inside `~/.longrun.json` it is just an array of `runny` objects that could be easily edited with text editor:

```json
[{
    "command": "pwd",
    "directories": [
        "~/longrun",
        "~/cloudcmd",
    ]
}, {
    "command": "whoami",
    "directories": [
        "~/cloudcmd"
    ]
}]
```

## Programmatical use

```js
const longrun = require('longrun');
const runner = longrun([
    command: 'pwd',
    directories: [
        '~/longrun',
        '~/cloudcmd'
    ]
]);

runner.on('data', (data) => process.stdout.write(data))
    .on('error', (error) => process.stderr.write(error))
    .on('exit', () => console.log('exit'));
```

## Special Thanks

- [Olena Zalitok](https://zalitok.github.io/ "Olena Zalitok") for **logo**.

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/longrun.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/node-longrun/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/node-longrun.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/longrun "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/node-longrun  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/node-longrun "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/node-longrun?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/node-longrun/badge.svg?branch=master&service=github

[LogoURL]:                  https://github.com/coderaiser/longrun/raw/master/longrun.jpg

