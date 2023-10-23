import template from 'art-template'
import chokidar from 'chokidar'
import path from 'node:path'
import fs, { mkdirSync } from 'node:fs'

export default class Renderer {
  /**
   * 渲染器
   * @param data.id 渲染器ID
   * @param data.type 渲染器类型
   * @param data.render 渲染器入口
   */
  constructor(data) {
    /** 渲染器ID */
    this.id = data.id || 'renderer'
    /** 渲染器类型 */
    this.type = data.type || 'image'
    /** 渲染器入口 */
    this.render = this[data.render || 'render']
    this.dir = './temp/html'
    this.html = {}
    this.watcher = {}
    this.createDir(this.dir)
  }

  /** 创建文件夹 */
  createDir(dirname) {
    mkdirSync(dirname, { recursive: true })
  }

  /** 模板 */
  dealTpl(name, data) {
    let { tplFile, saveId = name } = data
    let savePath = `./temp/html/${name}/${saveId}.html`
    mkdirSync(`./temp/html/${name}/`, { recursive: true })
    /** 读取html模板 */
    if (!this.html[tplFile]) {
      this.createDir(`./temp/html/${name}`)

      try {
        this.html[tplFile] = fs.readFileSync(tplFile, 'utf8')
      } catch (error) {
        console.error(`加载html错误：${tplFile}`)
        return false
      }

      this.watch(tplFile)
    }

    data.resPath = `./resources/`

    /** 替换模板 */
    let tmpHtml = template.render(this.html[tplFile], data)

    /** 保存模板 */
    fs.writeFileSync(savePath, tmpHtml)

    console.debug(`[图片生成][使用模板] ${savePath}`)

    return savePath
  }

  /** 监听配置文件 */
  watch(tplFile) {
    if (this.watcher[tplFile]) return

    const watcher = chokidar.watch(tplFile)
    watcher.on('change', path => {
      delete this.html[tplFile]
      console.info(`[修改html模板] ${tplFile}`)
    })

    this.watcher[tplFile] = watcher
  }
}
