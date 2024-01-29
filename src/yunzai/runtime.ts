/**
 * *********
 * yunzai.GENSHIN
 * *********
 */
import Runtime from '../../lib/plugins/runtime.js'
declare global {
  var runtime: typeof Runtime
}
global.runtime = Runtime
const EventReg =
  /^(#|\/)?(\*|星铁|星轨|穹轨|星穹|崩铁|星穹铁道|崩坏星穹铁道|铁道)/
declare global {
  var YUNZAI_REG: typeof EventReg
}
global.YUNZAI_REG = EventReg
/**
 *
 * @param e
 * @returns
 */
async function reSetgenShin(e: any) {
  e.isSr = false
  e.isGs = true
  if (e.attribute == 'group') {
    e.isGroup = true
  } else {
    e.isGroup = false
  }
  await runtime.init(e)
  // 判断是否是星铁命令，若是星铁命令则标准化处理
  // e.isSr = true，且命令标准化为 #星铁 开头
  Object.defineProperty(e, 'isSr', {
    get: () => e.game === 'sr',
    set: v => (e.game = v ? 'sr' : 'gs')
  })
  Object.defineProperty(e, 'isGs', {
    get: () => e.game === 'gs',
    set: v => (e.game = v ? 'gs' : 'sr')
  })
  e.sender = {}
  e.sender.card = e.user_name
  e.checkAuth = (val: any) => val
  if (EventReg.test(e.msg)) {
    e.game = 'sr'
    e.isSr = true
    e.msg = e.msg.replace(EventReg, '#星铁')
  }
  return e
}
declare global {
  var YUNZAI_GENSHIN: typeof reSetgenShin
}
global.YUNZAI_GENSHIN = reSetgenShin
