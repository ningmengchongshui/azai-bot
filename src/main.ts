import 'yunzai/init'
/**
 * 创建alemonjs - bot
 */
import { createBot } from 'alemonjs'
import configs from '../alemon.config.js'
import logins from '../alemon.login.js'
// 创建bot
createBot(configs, logins)
