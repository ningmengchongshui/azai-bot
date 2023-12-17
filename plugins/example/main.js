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
const app = createApp(import.meta.url)
app.reSetEvent(async e => {  
    if (e.attribute == 'group') {
       e.isGroup = true
    }
    await runtime.init(e)
    e.sender = {}
    e.sender.card = e.user_name
    return e
})
app.setCharacter('#')
app.component(apps)
app.mount()
