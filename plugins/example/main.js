import { createApp } from 'alemonjs'
import * as apps from './index.js'
const app = createApp(import.meta.url)
app.reSetEvent(global.YUNZAI_GENSHIN)
app.replace(/^(\/|#)/, '#')
app.use(apps)
app.mount()