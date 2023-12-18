import { createApp } from 'alemonjs'
import * as apps from './restart.js'
createApp(import.meta.url).reSetEvent(async e => {
  if (e.attribute == 'group') e.isGroup = true
  await runtime.init(e)
  e.sender = {}
  e.sender.card = e.user_name
  return e
}).replace(/^(\/|#)/,'#').use(apps).mount()