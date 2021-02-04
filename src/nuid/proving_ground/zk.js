const Zk = require('@nuid/zk')
const { program } = require('commander')

program.name('nuid-pg').version('0.1.0')

Object.keys(Zk).forEach(key => {
  program
    .command(`${key} [json_args_array]`)
    .action((json_args) => {
      const args = JSON.parse(json_args)
      console.log(JSON.stringify(Zk[key](...args)))
    })
})

program.parse(process.argv)
