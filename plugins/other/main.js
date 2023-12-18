import { createApp } from 'alemonjs'
import * as apps from './restart.js'
createApp(import.meta.url)
.reSetEvent(global.YUNZAI_GENSHIN)
.replace(/^(\/|#)/,'#')
.use(apps)
.mount()
