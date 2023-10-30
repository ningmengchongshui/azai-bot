/**
 * ********
 * 插件
 * ********
 */
const stateCache = {}
/**
 * 定时器记录
 */
const timeoutCache = {}
/**
 * 插件基础类
 */
export default class plugin {
  e:any
  name:string
  dsc:string
  event:string
  priority:number
  task:any
  rule:any[]
  constructor({
    name = 'app-name',
    dsc = '无',
    event = 'message',
    priority = 99999,
    task = { name: '', fnc: '', cron: '' },
    rule = []
  }) {
    this.name = name
    this.dsc = dsc
    this.event = event
    this.priority = priority
    this.task = {
      name: task?.name ?? '',
      fnc: task?.fnc ?? '',
      cron: task?.cron ?? ''
    }
    this.rule = rule
  }

  /**
   * @param msg 发送的消息
   * @param quote 是否引用回复
   * @param data.recallMsg 群聊是否撤回消息，0-120秒，0不撤回
   * @param data.at 是否at用户
   */
  reply(msg = '', quote = false, data = {}) {
    if (!this.e.reply || !msg) return false
    return this.e.reply(msg)
  }

  /**
   *
   * @param isGroup
   * @returns
   */
  conKey(isGroup = false) {
    if (isGroup) return `${JSON.stringify(this.rule)}:${this.name}:${this.e.group_id}`
    return `${JSON.stringify(this.rule)}:${this.name}:${this.e.user_id}`
  }

  /**
   * @param type 执行方法
   * @param isGroup 是否群聊
   * @param time 操作时间，默认120秒
   */
  setContext(type:string, isGroup = false, time = 120) {
    const key = this.conKey(isGroup)
    if (!stateCache[key]) stateCache[key] = {}
    stateCache[key][type] = this.e
    // 定时
    if (!(time && typeof time == 'number')) return
    if (!timeoutCache[key]) timeoutCache[key] = {}
    timeoutCache[key][type] = setTimeout(() => {
      this.finish(type, isGroup)
      this.e.reply('操作超时已取消')
    }, time * 1000)
  }

  /**
   *
   * @returns
   */
  getContext() {
    return stateCache[this.conKey()]
  }

  /**
   *
   * @returns
   */
  getContextGroup() {
    return stateCache[this.conKey(true)]
  }

  /**
   * @param type 执行方法
   * @param isGroup 是否群聊
   */
  finish(type:string, isGroup = false) {
    if (!this.conKey(isGroup)) return
    if (
      // 检擦key
      stateCache[this.conKey(isGroup)] &&
      // 检查方法
      stateCache[this.conKey(isGroup)][type]
    ) {
      // 删除方法
      delete stateCache[this.conKey(isGroup)][type]
    }
    if (
      // 检擦key
      timeoutCache[this.conKey(isGroup)] &&
      // 检查方法
      timeoutCache[this.conKey(isGroup)][type]
    ) {
      /**
       * 删除定时任务
       */
      clearTimeout(timeoutCache[this.conKey(isGroup)][type])
    }
  }
}
