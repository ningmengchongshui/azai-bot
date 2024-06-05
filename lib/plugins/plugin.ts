import { APlugin } from 'alemonjs'
export default class plugin extends APlugin {
  constructor(config) {
    super(config)
  }
  /**
   * 
   * @param isGroup 
   * @returns 
   */
  conKey(isGroup = false) {
    if (isGroup) {
      return `${this.name}.${this.e.channel_id || this.e.group_id}`
    } else {
      return `${this.name}.${this.e.user_id || this.e.user_id}`
    }
  }
  /**
   * @param type 执行方法
   * @param isGroup 是否群聊
   * @param time 操作时间
   * @param timeout 操作超时回复
   */
  setContext(type, isGroup, time = 120, timeout = "操作超时已取消") {
    return
  }
  /**
   * 
   * @param type 
   * @param isGroup 
   */
  finish(type, isGroup) {
    //
  }
  /**
   * 
   * @param args 
   */
  awaitContext(...args) {
    //
  }
  /**
   * 
   * @param context 
   */
  resolveContext(context) {
    //
  }
  /**
   * 
   * @param plugin 
   * @param tpl 
   * @param data 
   * @param cfg 
   */
  async renderImg(plugin, tpl, data, cfg) {
    //

  }
}