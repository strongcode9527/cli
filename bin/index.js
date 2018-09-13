#!/usr/bin/env node

const program = require('commander');
const VERSION = require('../package').version;
const go = require('../src/index');
const chalk = require('chalk');

program
    .name('strong')
    .version(VERSION, '-v, --version')
    .parse(process.argv);

let args = program.args;

/* eslint-disable */
if (typeof args[0] === 'undefined') {
    console.error('请指定项目名称');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('<project-name>')}`
    );
    console.log();
    console.log('例如:');
    console.log(
        `  ${chalk.cyan(program.name())} ${chalk.green('strong-app')}`
    );
    process.exit(1);
}

go(program.args);