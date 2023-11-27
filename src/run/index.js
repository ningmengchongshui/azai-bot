import { commandRun } from 'afloat/run'
process.argv.push('pm2')
const argv = [...process.argv.slice(2)]
commandRun(argv)
