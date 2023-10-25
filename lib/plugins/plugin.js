/**
 * ********
 * 插件
 * ********
 */
let stateArr = {}
export default class plugin {
  constructor({
    name = 'app-name',
    dsc = '无',
    event = 'MESSAGES',
    priority = 9999,
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
  setContext(type, isGroup = false, time = 120) {
    const key = this.conKey(isGroup)
    if (!stateArr[key]) stateArr[key] = {}
    stateArr[key][type] = this.e
    if (!time) return
    /** 操作时间 */
    setTimeout(() => {
      if (!stateArr[key][type]) return
      delete stateArr[key][type]
      this.e.reply('操作超时已取消')
    }, time * 1000)
  }

  /**
   *
   * @returns
   */
  getContext() {
    return stateArr[this.conKey()]
  }

  /**
   *
   * @returns
   */
  getContextGroup() {
    return stateArr[this.conKey(true)]
  }

  /**
   * @param type 执行方法
   * @param isGroup 是否群聊
   */
  finish(type, isGroup = false) {
    if (
      stateArr[this.conKey(isGroup)] &&
      stateArr[this.conKey(isGroup)][type]
    ) {
      delete stateArr[this.conKey(isGroup)][type]
    }
  }
}
