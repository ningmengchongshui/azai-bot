import { setLog } from 'alemonjs/logs'
if (!process.argv.includes('pm2')) {
  const prefix = '[A-YUNZAI]'
  const getTime = () => {
    return new Date().toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  }
  setLog(getTime, prefix)
}
