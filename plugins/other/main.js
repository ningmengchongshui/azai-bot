import { createApp } from 'alemonjs'
import * as apps from './restart.js'
const app = createApp(import.meta.url)
app.event(global?.YUNZAI_GENSHIN  ?? (e => e))
.replace(global.YUNZAI_REG,'#星铁')
.replace(/^(\/|#)/,'#')
app.use(apps)
app.mount()
// 子应用识别
await import('./sub.js')
