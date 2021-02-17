#!/usr/bin/env node

const { program } = require('commander')

program
  .name('nuid-cli')
  .version('0.1.0')
  .command('zk', 'CLI interface to the @nuid/zk package')
  .parse(process.argv)
