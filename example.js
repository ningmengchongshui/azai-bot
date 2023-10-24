import fs from 'node:fs'
const files = fs.readdirSync('./plugins/example').filter(file => file.endsWith('.js'))
let ret = []
files.forEach(file => {
  ret.push(import(`./plugins/example/${file}`))
})
ret = await Promise.allSettled(ret)
let example = {}
for (const i in files) {
  const name = files[i].replace('.js', '')
  if (ret[i].status != 'fulfilled') {
    console.error(`载入插件错误：${name}`)
    console.error(ret[i].reason)
    continue
  }
  example[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { example }
