import template from 'art-template'
import chokidar from 'chokidar'
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
/**
 * ******
 *  渲染
 * *****
 */
export default class Renderer {
  id: string
  type: string
  render: string
  dir: string
  html: any
  watcher: any
  /**
   * 渲染器
   * @param data.id 渲染器ID
   * @param data.type 渲染器类型
   * @param data.render 渲染器入口
   */
  constructor(data: { id: string; type: string; render: any }) {
    // 渲染器ID
    this.id = data.id || 'renderer'
    // 渲染器类型
    this.type = data.type || 'image'
    // 渲染器入口
    this.render = this[data.render || 'render']
    this.dir = './temp/html'
    this.html = {}
    this.watcher = {}
    // 初始化目录
    mkdirSync(this.dir, { recursive: true })
  }

  /**
   * 模板
   * @param name
   * @param data
   * @returns
   */
  dealTpl(name: string, data: any) {
    const { tplFile, saveId = name } = data
    const savePath = `./temp/html/${name}/${saveId}.html`
    mkdirSync(`./temp/html/${name}/`, { recursive: true })
    // 读取html模板
    if (!this.html[tplFile]) {
      mkdirSync(`./temp/html/${name}`, { recursive: true })
      try {
        this.html[tplFile] = readFileSync(tplFile, 'utf8')
      } catch (error) {
        console.error(`加载html错误：${tplFile}`)
        return false
      }
      this.watch(tplFile)
    }

    data.resPath = `./resources/`

    // 替换模板
    const tmpHtml = template.render(this.html[tplFile], data)

    /** 保存模板 */
    writeFileSync(savePath, tmpHtml)

    console.debug(`[图片生成][使用模板] ${savePath}`)

    return savePath
  }

  /**
   * 监听配置文件
   * @param tplFile
   * @returns
   */
  watch(tplFile: string) {
    if (this.watcher[tplFile]) return
    const watcher = chokidar.watch(tplFile)
    watcher.on('change', path => {
      delete this.html[tplFile]
      console.info(`[修改html模板] ${tplFile}`)
    })
    this.watcher[tplFile] = watcher
  }
}
