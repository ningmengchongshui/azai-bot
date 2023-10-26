import {
  existsSync,
  readFileSync,
  readdirSync,
  copyFileSync,
  mkdirSync
} from 'node:fs'
import chokidar from 'chokidar'
import { parse as YAMLParse } from 'yaml'

/**
 * 配置文件
 */
class Cfg {
  constructor() {
    this.config = {}
    this.watcher = { config: {}, defSet: {} }
    this.initCfg()
  }

  /**
   * 初始化配置
   */
  initCfg() {
    let path = 'config/config/'
    let pathDef = 'config/default_config/'
    mkdirSync('./config/config', { recursive: true })
    mkdirSync('./config/default_config', { recursive: true })
    const files = readdirSync(pathDef).filter(file => file.endsWith('.yaml'))
    for (let file of files) {
      const dir = `${path}${file}`
      if (!existsSync()) copyFileSync(`${pathDef}${file}`, dir)
    }
  }

  /**
   * 用户配置
   * @param name
   * @returns
   */
  getConfig(name) {
    return this.getYaml('config', name)
  }

  /**
   * @param app  功能
   * @param name 配置文件名称
   */
  getdefSet(name) {
    return this.getYaml('default_config', name)
  }

  /**
   * 机器人qq号
   */
  get qq() {
    return Number(this.getConfig('qq').qq)
  }

  /**
   * 密码
   */
  get pwd() {
    return this.getConfig('qq').pwd
  }

  /**
   * icqq配置
   */
  get bot() {
    const defbot = this.getdefSet('bot')
    let bot = this.getConfig('bot')
    bot = { ...defbot, ...bot }
    bot.platform = this.getConfig('qq').platform
    /** 设置data目录，防止pm2运行时目录不对 */
    bot.data_dir = process.cwd() + '/data/icqq/' + this.qq || ''
    if (!bot.ffmpeg_path) delete bot.ffmpeg_path
    if (!bot.ffprobe_path) delete bot.ffprobe_path
    return bot
  }

  get other() {
    return this.getConfig('other')
  }

  get redis() {
    return this.getConfig('redis')
  }

  get renderer() {
    return this.getConfig('renderer')
  }

  get notice() {
    return this.getConfig('notice')
  }

  /** 主人qq */
  get masterQQ() {
    let masterQQ = this.getConfig('other').masterQQ || []
    if (Array.isArray(masterQQ)) {
      masterQQ.forEach(qq => {
        qq = String(qq)
      })
    } else {
      masterQQ = [String(masterQQ)]
    }
    return masterQQ
  }

  /**
   * package.json
   */
  get package() {
    if (this._package) return this._package
    this._package = JSON.parse(readFileSync('package.json', 'utf8'))
    return this._package
  }

  /** 群配置 */
  getGroup(groupId = '') {
    const config = this.getConfig('group')
    const defCfg = this.getdefSet('group')
    if (config[groupId]) {
      return { ...defCfg.default, ...config.default, ...config[groupId] }
    }
    return { ...defCfg.default, ...config.default }
  }

  /** other配置 */
  getOther() {
    const def = this.getdefSet('other')
    const config = this.getConfig('other')
    return { ...def, ...config }
  }

  /** notice配置 */
  getNotice() {
    const def = this.getdefSet('notice')
    const config = this.getConfig('notice')
    return { ...def, ...config }
  }

  /**
   * 获取配置yaml
   * @param type 默认跑配置-defSet，用户配置-config
   * @param name 名称
   */
  getYaml(type, name) {
    const file = `config/${type}/${name}.yaml`
    const key = `${type}.${name}`
    if (this.config[key]) return this.config[key]
    this.config[key] = YAMLParse(readFileSync(file, 'utf8'))
    this.watch(file, name, type)
    return this.config[key]
  }

  /** 监听配置文件 */
  watch(file, name, type = 'default_config') {
    const key = `${type}.${name}`
    if (this.watcher[key]) return
    const watcher = chokidar.watch(file)
    watcher.on('change', path => {
      delete this.config[key]
      if (typeof Bot == 'undefined') return
      console.info(`[修改配置文件][${type}][${name}]`)
      if (this[`change_${name}`]) {
        this[`change_${name}`]()
      }
    })

    this.watcher[key] = watcher
  }

  change_qq() {
    if (process.argv.includes('login') || !this.qq) return
    console.info('修改机器人QQ或密码，请手动重启')
  }

  /** 修改日志等级 */
  async change_bot() {
    const log = await import('./log.js')
    log.default()
  }
}

export default new Cfg()
