import { plugin, AMessage } from 'alemonjs'

export class PluginName extends plugin {
  constructor() {
    super({
      dsc: '插件描述',
      rule: [
        {
          reg: /正则表达式/,
          fnc: '方法名',
          dsc: '/正则',
          doc: '这条正则的意思'
        }
      ]
    })
  }
  async 方法名(e: AMessage): Promise<boolean> {
    e.reply('回复内容')
    return false
  }
}
