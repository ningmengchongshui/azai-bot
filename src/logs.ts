if (!process.argv.includes('run')) {
  const log = console.log
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
  global.console.log = (...argv: any[]) => {
    log(getTime(), ...argv)
  }
  const info = console.info
  global.console.info = (...argv: any[]) => {
    info(getTime(), ...argv)
  }
  const error = console.error
  global.console.error = (...argv: any[]) => {
    error(getTime(), ...argv)
  }
  const debug = console.debug
  global.console.debug = (...argv: any[]) => {
    debug(getTime(), ...argv)
  }
}
