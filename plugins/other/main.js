import { createApp } from 'alemonjs'
import * as apps from './restart.js'
const app = createApp(import.meta.url)
app.event(global?.YUNZAI_GENSHIN  ?? (e => e))
.replace(global.YUNZAI_REG,'#星铁')
.replace(/^(\/|#)/,'#')
for(const key in apps){
  app.use(apps[key])
}
app.mount()
