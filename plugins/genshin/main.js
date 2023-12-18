import { createApp } from 'alemonjs'
import { apps } from './index.js'
createApp(import.meta.url)
.reSetEvent(global.YUNZAI_EVENT)
.replace(/^(\/|#)/,'#')
.use(apps)
.mount()
