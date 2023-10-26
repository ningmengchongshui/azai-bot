if (!process.argv.includes('run')) {
  const prefix = '[AlemonJS]'
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
  const log = console.log
  global.console.log = (...argv: any[]) => {
    log(prefix, `[${getTime()}]`, ...argv)
  }
  const info = console.info
  global.console.info = (...argv: any[]) => {
    info(prefix, `[${getTime()}]`, ...argv)
  }
  const error = console.error
  global.console.error = (...argv: any[]) => {
    error(prefix, `[${getTime()}]`, ...argv)
  }
  const debug = console.debug
  global.console.debug = (...argv: any[]) => {
    debug(prefix, `[${getTime()}]`, ...argv)
  }
}
