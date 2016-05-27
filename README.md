# Longrun

Run set of commands in group of directories. Based on [runny](https://github.com/coderaiser/node-runny "Runny").

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
  clear   Clear directories list from runner
  fin     Remove runner(s)

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
$ longrun run
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

## License

MIT

