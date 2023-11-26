/**
 * *************
 * 自定义时间提示
 * *************
 */
import './alemon/logs.js'
/**
 * *************
 * Yunzai global
 * *************
 */
import './global.js'
/**
 * yunzai
 */
const ars = process.argv.slice(2)
if (ars.includes('openNTQQ')) {
  await import('./yunzai/segment.js')
  const loader = (await import('../lib/plugins/loader.js')) as any
  loader.default.load()
} else if (ars.includes('openICQQ')) {
  const Yunzai = (await import('../lib/bot.js')).default
  global.Bot = await Yunzai.run()
} else {
  await import('./alemon/segment.js')
}
import './alemon/pkg.js'
