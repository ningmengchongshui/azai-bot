import { createApps } from 'alemonjs'
import * as apps from './restart.js'
const app = createApps(import.meta.url)
app.setMessage(async e => {
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