// yunzai.global
import './global.js'
// alemonjs
import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
const AlemonJS = '[AlemonJS]'
console.log('-------------------------')
console.log(AlemonJS, 'DOCS')
console.log('https://alemonjs.com')
console.log('-------------------------')
console.log(AlemonJS, '热开发模式')
console.log(AlemonJS, 'npm run dev')
console.log('-------------------------')
import { example } from './example.js'
export default defineAlemonConfig({
  login: analysis(login),
  app: {
    component: [example]
  },
  // close yunzai poke
  shieldEvent: ['poke', 'notice.*.poke'],
  plugin: {
    // yunzai
    directory: '/plugins'
  }
})
