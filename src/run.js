import { commandRun } from 'alemonjs/run'
process.argv.push('run')
commandRun(process.argv.slice(2))
