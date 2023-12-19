import { createApp } from 'alemonjs'
import * as apps from './restart.js'
const app = createApp(import.meta.url)
app.reSetEvent(global.YUNZAI_GENSHIN)
app.replace(/^(\/|#)/, '#')
app.use(apps)
app.mount()
// 子应用识别
await import('./sub.js')
