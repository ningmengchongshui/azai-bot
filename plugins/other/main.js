import { createApp, getAppProCoinfg } from 'alemonjs'
import * as apps from './restart.js'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
const app = createApp(import.meta.url)
app.reSetEvent(global.YUNZAI_GENSHIN)
app.replace(/^(\/|#)/, '#')
app.use(apps)
/**
 * 加载应用插件
 * @param dir 插件路径
 */
async function loadPlugins(dir) {
    if (!existsSync(dir)) {
        app.mount()
        return
    }
    const flies = readdirSync(dir)
    if (flies.length == 0) {
        app.mount()
        return
    }
    // 读取配置
    const open = getAppProCoinfg('openRegex')
    const close = getAppProCoinfg('closeRegex')
    // 排除
    const APPS = flies
        .filter(item => open.test(item))
        .filter(item => {
            if (!close) return true
            return !close.test(item)
        })
    //动态扫描
    const input = getAppProCoinfg('main')
    for (const appname of APPS) {
        const index = `${dir}/${appname}/index.js`
        if (!existsSync(`${dir}/${appname}${input}.js`) && !existsSync(`${dir}/${appname}${input}.ts`) && existsSync(index)) {
            const { apps } = await import(`file://${index}`)
            try {
                // 读取  index 并 归为 other插件
                app.use(apps)
            } catch (err) {
                console.error(`file://${index}`)
                // 属于依赖缺失
                const match = /Cannot find package '(.+)' imported from/.exec(
                    err.message
                )
                if (match && match[1]) {
                    const packageName = match[1]
                    console.error(`[APP] [${appname}] 缺失 ${packageName} 包`)
                    // 发送消息
                    process.send?.({
                        type: 'lack-of-package',
                        message: {
                            packageName
                        }
                    })
                    return
                } else {
                    // 其他错误
                    console.error(`[APP] [${appname}]`, err)
                    process.send?.({
                        type: 'error',
                        message: err
                    })
                }
            }
        }
    }
    // 搞完了 挂载
    app.mount()
    return
}
const dir = join(process.cwd(), './plugins')
await loadPlugins(dir)