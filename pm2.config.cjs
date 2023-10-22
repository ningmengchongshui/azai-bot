const ars = process.argv.slice(4)
const AlemonJS = '[AlemonJS@template2]'
const findArs = ars.find(item => item.startsWith('@'))
const apps = []
if (!findArs) {
  apps.push({
    name: 'alemonb',
    args: ars
  })
} else {
  if (!ars[0].startsWith('@')) {
    ars.unshift('alemonb')
  }
  const msg = ars.join(' ')
  const arr = msg.split('@')
  for (const arg of arr) {
    if (arg == '') {
      continue
    }
    const ar = arg.split(' ')
    const existingApp = apps.find(app => app.name === ar[0])
    if (!existingApp) {
      const name = ar.shift()
      if (name != undefined) {
        apps.push({
          name: name,
          args: ar ?? []
        })
      }
    }
  }
}
console.log('------------------------------------------')
for (const item of apps) {
  console.log(AlemonJS, 'npm run start', item.name, item.args.join(' '))
  console.log(AlemonJS, 'npm run logs', item.name)
  console.log('------------------------------------------')
}
console.log(AlemonJS, 'npm run list')
console.log(AlemonJS, 'npm run monit')
console.log(AlemonJS, 'npm run delete')
console.log(AlemonJS, 'npm run kill')
console.log('------------------------------------------')
module.exports = {
  apps: apps.map(app => ({
    name: app.name,
    script: 'alemon.run.js',
    instances: 1,
    autorestart: true,
    exec_mode: 'cluster',
    max_memory_restart: '2G',
    cron_restart: '0 */1 * * *',
    args: app.args,
    watch: false,
    autodump: true,
    merge_logs: true,
    error_file: `./logs/${app.name}/err.log`,
    out_file: `./logs/${app.name}/out.log`,
    log_max_size: '10M',
    log_rotate_interval: 'daily',
    log_date_format: 'YYYY-MM-DD HH:mm:ss',
    env: {
      NODE_ENV: 'production'
    },
    kill_timeout: 5000,
    listen_timeout: 3000,
    max_restarts: 10,
    restart_delay: 5000,
    restart_delay_max: 10000
  }))
}
