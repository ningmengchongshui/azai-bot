import lodash from 'lodash'
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import cfg from '../config/config.js'
import common from '../common/common.js'
import puppeteer from '../puppeteer/puppeteer.js'
// genshin
import gsCfg from '../../plugins/genshin/model/gsCfg.js'
import MysApi from '../../plugins/genshin/model/mys/mysApi.js'
import MysInfo from '../../plugins/genshin/model/mys/mysInfo.js'
import NoteUser from '../../plugins/genshin/model/mys/NoteUser.js'
import MysUser from '../../plugins/genshin/model/mys/MysUser.js'
export default class Runtime {
  constructor(e) {
    this.e = e
    this._mysInfo = {}
  }

  get uid() {
    return this.user?.uid
  }

  get hasCk() {
    return this.user?.hasCk
  }

  get user() {
    return this.e.user
  }

  get cfg() {
    return cfg
  }

  get gsCfg() {
    return gsCfg
  }

  get common() {
    return common
  }

  get puppeteer() {
    return puppeteer
  }

  get MysInfo() {
    return MysInfo
  }

  get NoteUser() {
    return NoteUser
  }

  get MysUser() {
    return MysUser
  }

  static async init(e) {
    await MysInfo.initCache()
    const runtime = new Runtime(e)
    e.runtime = runtime
    e.game = e.isSr ? 'sr' : 'gs'
    await runtime.initUser()
    return runtime
  }

  async initUser() {
    const e = this.e
    const user = await NoteUser.create(e)
    if (!user) return
    e.user = new Proxy(user, {
      get(self, key, receiver) {
        const game = e.isSr ? 'sr' : 'gs'
        const fnMap = {
          uid: 'getUid',
          uidList: 'getUidList',
          mysUser: 'getMysUser',
          ckUidList: 'getCkUidList'
        }
        if (fnMap[key]) return self[fnMap[key]](game)
        if (key === 'uidData') return self.getUidData('', game)
        const arr1 = [
          'getUid',
          'getUidList',
          'getMysUser',
          'getCkUidList',
          'getUidMapList',
          'getGameDs'
        ]
        if (arr1.includes(String(key))) return (_game, arg2) => self[key](_game || game, arg2)
        const arr2 = [
          'getUidData',
          'hasUid',
          'addRegUid',
          'delRegUid',
          'setMainUid'
        ]
        if (arr2.includes(String(key))) return (uid, _game = '') => self[key](uid, _game || game)
        return self[key]
      }
    })

  }

  /**
   * 获取MysInfo实例
   *
   * @param targetType all: 所有用户均可， cookie：查询用户必须具备Cookie
   * @returns {Promise<boolean|MysInfo>}
   */
  async getMysInfo(targetType = 'all') {
    if (!this._mysInfo[targetType]) {
      this._mysInfo[targetType] = await MysInfo.init(
        this.e,
        targetType === 'cookie' ? 'detail' : 'roleIndex'
      )
    }
    return this._mysInfo[targetType]
  }

  async getUid() {
    return await MysInfo.getUid(this.e)
  }

  /**
   * 获取MysApi实例
   *
   * @param targetType all: 所有用户均可， cookie：查询用户必须具备Cookie
   * @param option MysApi option
   * @returns {Promise<boolean|MysApi>}
   */
  async getMysApi(targetType = 'all', option = {}) {
    const mys = await this.getMysInfo(targetType)
    if (mys.uid && mys?.ckInfo?.ck) return new MysApi(mys.uid, mys.ckInfo.ck, option)
    return false
  }

  /**
   * 生成MysApi实例
   * @param uid
   * @param ck
   * @param option
   * @returns {Promise<MysApi>}
   */
  async createMysApi(uid, ck, option) {
    return new MysApi(uid, ck, option)
  }

  /**
   *
   * @param plugin plugin key
   * @param path html文件路径，相对于plugin resources目录
   * @param data 渲染数据
   * @param cfg 渲染配置
   * @param cfg.retType 返回值类型
   * * default/空：自动发送图片，返回true
   * * msgId：自动发送图片，返回msg id
   * * base64: 不自动发送图像，返回图像base64数据
   * @param cfg.beforeRender({data}) 可改写渲染的data数据
   * @returns {Promise<boolean>}
   */
  async render(plugin, path, data = {}, cfg = {}) {
    // 处理传入的path
    path = path.replace(/.html$/, '')
    const paths = lodash.filter(path.split('/'), p => !!p)
    path = paths.join('/')
    
    // 创建目录
    const mkdir = check => {
      let currDir = `${process.cwd()}/temp`
      for (const p of check.split('/')) {
        currDir = `${currDir}/${p}`
        if (!existsSync(currDir)) {
          mkdirSync(currDir)
        }
      }
      return currDir
    }

    mkdir(`html/${plugin}/${path}`)

    // 自动计算pluResPath
    const pluResPath = `../../../${lodash.repeat('../', paths.length)}plugins/${plugin}/resources/`
    const miaoResPath = `../../../${lodash.repeat('../', paths.length)}plugins/miao-plugin/resources/`
    const layoutPath = process.cwd() + '/plugins/miao-plugin/resources/common/layout/'

    // 渲染data
    data = {
      sys: {
        scale: 1
      },
      /** miao 相关参数 **/
      copyright: `Created By A-Yunzai<span class="version"> V1.0.0 </span> `,
      _res_path: pluResPath,
      _miao_path: miaoResPath,
      _tpl_path: process.cwd() + '/plugins/miao-plugin/resources/common/tpl/',
      defaultLayout: layoutPath + 'default.html',
      elemLayout: layoutPath + 'elem.html',

      ...data,

      /** 默认参数 **/
      _plugin: plugin,
      _htmlPath: path,
      pluResPath,
      tplFile: `./plugins/${plugin}/resources/${path}.html`,
      saveId: data.saveId || data.save_id || paths[paths.length - 1],
      pageGotoParams: {
        waitUntil: 'networkidle2'
      }
    }
    // 处理beforeRender
    if (cfg.beforeRender) data = cfg.beforeRender({ data }) || data

    // 保存模板数据
    if (process.argv.includes('dev')) {
      // debug下保存当前页面的渲染数据，方便模板编写与调试
      // 由于只用于调试，开发者只关注自己当时开发的文件即可，暂不考虑app及plugin的命名冲突
      const saveDir = mkdir(`ViewData/${plugin}`)
      const file = `${saveDir}/${data._htmlPath.split('/').join('_')}.json`
      writeFileSync(file, JSON.stringify(data))
    }
    
    // 截图
    const base64 = await puppeteer.screenshot(`${plugin}/${path}`, data)
    if (cfg.retType === 'base64') return base64

    let ret = true
    if (base64) ret = await this.e.reply(base64)

    return cfg.retType === 'msgId' ? ret : true
  }
}
