import { segment } from 'icqq'
import setLog from '../lib/config/log.js'
import Yunzai from '../lib/config/set.js'
Yunzai.run()
await setLog()
global.segment = segment
