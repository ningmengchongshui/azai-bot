import { setLog } from 'alemonjs/logs'
if (!process.argv.includes('pm2')) {
  setLog(() => {
    return `[A-YUNZAI] [${new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })}]`
  })
}
