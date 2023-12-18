import { createApp } from 'alemonjs'
import * as apps from './restart.js'
createApp(import.meta.url)
.reSetEvent(global.YUNZAI_EVENT)
.replace(/^(\/|#)/,'#')
.use(apps)
.mount()
