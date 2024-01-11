import { AppLoadConfig, createSubApp } from 'alemonjs'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
/**
 * 加载应用插件
 * @param dir 插件路径
 */
async function loadPlugins(dir) {
    if (!existsSync(dir)) return
    const flies = readdirSync(dir)
    if (flies.length == 0) return
    // 读取配置
    const open = AppLoadConfig.get('openRegex')
    const close = AppLoadConfig.get('closeRegex')
    // 排除
    const APPS = flies
        .filter(item => open.test(item))
        .filter(item => {
            if (!close) return true
            return !close.test(item)
        })
    //动态扫描
    const input = AppLoadConfig.get('main')
    for (const appname of APPS) {
        const index = `${dir}/${appname}/index.js`
        if (!existsSync(`${dir}/${appname}${input}.js`) && !existsSync(`${dir}/${appname}${input}.ts`) && existsSync(index)) {
            try {
                const { apps } = await import(`file://${index}`)
                const app = createSubApp(appname)
                app.event(global?.YUNZAI_GENSHIN ?? global.YUNZAI_EVENT ?? (e => e))
                app.replace(/^(\/|#)/, '#')
                app.use(apps)
                app.mount()
                console.log('[APP]', appname)
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
    return
}
const dir = join(process.cwd(), './plugins')
await loadPlugins(dir)