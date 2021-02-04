#!/usr/bin/env node

const Zk = require('@nuid/zk')
const { program } = require('commander')

Object.keys(Zk).forEach(key => {
  program.command(`${key} [jsonArgsArray]`).action(jsonArgs => {
    const args = JSON.parse(jsonArgs)
    console.log(JSON.stringify(Zk[key](...args)))
  })
})

program.parse(process.argv)
