import { createApp } from 'alemonjs'
import { apps } from './index.js'
createApp(import.meta.url)
.reSetEvent(global.YUNZAI_GENSHIN)
.replace(/^(\/|#)/,'#')
.use(apps)
.mount()
