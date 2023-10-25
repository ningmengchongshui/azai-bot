import template from 'art-template'
import fs, { mkdirSync } from 'fs'
import lodash from 'lodash'
import chokidar from 'chokidar'
import pupConfig from '../../puppeteerrc.js'
/**
 * ******
 * 截图
 * *****
 */
let puppeteer = {}
class Puppeteer {
  constructor() {
    this.browser = false
    this.lock = false
    this.shoting = []
    this.restartNum = 100
    this.renderNum = 0
    this.html = {}
    this.watcher = {}
  }

  async initPupp() {
    if (!lodash.isEmpty(puppeteer)) return puppeteer
    puppeteer = (await import('puppeteer')).default
    return puppeteer
  }

  /**
   * 初始化chromium
   */
  async browserInit() {
    await this.initPupp()
    if (this.browser) return this.browser
    if (this.lock) return false
    this.lock = true

    console.info('puppeteer Chromium 启动中...')

    /** 初始化puppeteer */
    this.browser = await puppeteer.launch(pupConfig).catch(err => {
      if (typeof err == 'object') {
        console.error(JSON.stringify(err))
      } else {
        console.error(err.toString())
        if (err.toString().includes('Could not find Chromium')) {
          console.error(
            '没有正确安装Chromium，可以尝试执行安装命令：node ./node_modules/puppeteer/install.js'
          )
        }
      }
    })

    this.lock = false
    if (!this.browser) {
      console.error('puppeteer Chromium 启动失败')
      return false
    }
    console.info('puppeteer Chromium 启动成功')

    /** 监听Chromium实例是否断开 */
    this.browser.on('disconnected', e => {
      console.error('Chromium实例关闭或崩溃！')
      this.browser = false
    })

    return this.browser
  }

  /**
   * `chromium` 截图
   * @param data 模板参数
   * @param data.tplFile 模板路径，必传
   * @param data.saveId  生成html名称，为空name代替
   * @param data.imgType  screenshot参数，生成图片类型：jpeg，png
   * @param data.quality  screenshot参数，图片质量 0-100，jpeg是可传，默认90
   * @param data.omitBackground  screenshot参数，隐藏默认的白色背景，背景透明。默认不透明
   * @param data.path   screenshot参数，截图保存路径。截图图片类型将从文件扩展名推断出来。如果是相对路径，则从当前路径解析。如果没有指定路径，图片将不会保存到硬盘。
   * @return oicq img
   */
  async screenshot(name, data = {}) {
    if (!(await this.browserInit())) {
      return false
    }
    const savePath = this.dealTpl(name, data)
    if (!savePath) return false

    let buff = ''
    const start = Date.now()

    this.shoting.push(name)

    try {
      const page = await this.browser.newPage()
      await page.goto(
        `file://${process.cwd()}${lodash.trim(savePath, '.')}`,
        data.pageGotoParams || {}
      )
      const body = (await page.$('#container')) || (await page.$('body'))

      const randData = {
        type: data.imgType || 'jpeg',
        omitBackground: data.omitBackground || false,
        quality: data.quality || 90,
        path: ''
      }

      if (data.imgType == 'png') delete randData.quality

      buff = await body.screenshot(randData)

      page.close().catch(err => console.error(err))
    } catch (error) {
      console.error(`图片生成失败:${name}:${error}`)
      /** 关闭浏览器 */
      if (this.browser) {
        await this.browser.close().catch(err => console.error(err))
      }
      this.browser = false
      buff = ''
      return false
    }

    this.shoting.pop()

    if (!buff) {
      console.error(`图片生成为空:${name}`)
      return false
    }

    this.renderNum++

    /** 计算图片大小 */
    const kb = (buff.length / 1024).toFixed(2) + 'kb'

    console.info(
      `[图片生成][${name}][${this.renderNum}次] ${kb} ${Date.now() - start}`
    )

    this.restart()

    return buff
  }

  /** 模板 */
  dealTpl(name, data) {
    const { tplFile, saveId = name } = data

    const savePath = `./data/html/${name}/${saveId}.html`

    /** 读取html模板 */

    if (!this.html[tplFile]) {
      mkdirSync(`./data/html/${name}`, { recursive: true })

      try {
        this.html[tplFile] = fs.readFileSync(tplFile, 'utf8')
      } catch (error) {
        console.error(`加载html错误：${tplFile}`)
        return false
      }

      this.watch(tplFile)
    }

    data.resPath = `${process.cwd()}/resources/`

    const tmpHtml = template.render(this.html[tplFile], data)

    /** 保存模板 */
    try {
      fs.writeFileSync(savePath, tmpHtml)
    } catch (err) {
      console.info('写入错误', err)
    }

    console.debug(`[图片生成][使用模板] ${savePath}`)

    return savePath
  }

  /** 监听配置文件 */
  watch(tplFile) {
    if (this.watcher[tplFile]) return

    const watcher = chokidar.watch(tplFile)
    watcher.on('change', path => {
      delete this.html[tplFile]
      console.mark(`[修改html模板] ${tplFile}`)
    })

    this.watcher[tplFile] = watcher
  }

  /** 重启 */
  restart() {
    /** 截图超过重启数时，自动关闭重启浏览器，避免生成速度越来越慢 */
    if (this.renderNum % this.restartNum == 0) {
      if (this.shoting.length <= 0) {
        setTimeout(async () => {
          if (this.browser) {
            await this.browser.close().catch(err => console.error(err))
          }
          this.browser = false
          console.mark('puppeteer 关闭重启...')
        }, 100)
      }
    }
  }
}

export default new Puppeteer()
