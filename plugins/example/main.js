import { createApp } from 'alemonjs'
import { readdirSync } from 'node:fs'
const files = readdirSync('./plugins/example').filter(file => file.endsWith('.js')).filter(file => file != 'main.js')
let ret = []
files.forEach((file) => {
    ret.push(import(`./${file}`))
})
ret = await Promise.allSettled(ret)
let apps = {}
for (const i in files) {
    const name = files[i].replace('.js', '')
    if (ret[i].status != 'fulfilled') {
        console.error(`载入插件错误：${name}`)
        console.error(ret[i].reason)
        continue
    }
    apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
const arg = /^(#|\/)?(\*|星铁|星轨|穹轨|星穹|崩铁|星穹铁道|崩坏星穹铁道|铁道)/
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
  