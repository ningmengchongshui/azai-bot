import { commandRun } from 'alemonjs/run'
process.argv.push('pm2')
commandRun(process.argv.slice(2))
