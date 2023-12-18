import { createApp } from 'alemonjs'
import { apps } from './index.js'
const arg = /^(#|\/)?(\*|星铁|星轨|穹轨|星穹|崩铁|星穹铁道|崩坏星穹铁道|铁道)/
/**
 * *******
 * 创建应用 createApp
 * 重定义  reSetEvent
 * 切割消息 replace
 * 使用 use
 * 挂载 mount
 * *******
 */
createApp(import.meta.url).reSetEvent(async e => {
  e.isSr = true
  e.isGs = true
  if (e.attribute == 'group') e.isGroup = true
  await runtime.init(e)
  Object.defineProperty(e, 'isSr', {
    get: () => e.game === 'sr',
    set: (v) => { e.game = v ? 'sr' : 'gs' }
  })
  Object.defineProperty(e, 'isGs', {
    get: () => e.game === 'gs',
    set: (v) => { e.game = v ? 'gs' : 'sr' }
  })
  if (arg.test(e.msg)) e.game = 'sr'
  e.sender = {}
  e.sender.card = e.user_name
  return e
}).replace(arg,'#星铁').replace(/^(\/|#)/,'#').use(apps).mount()
