import { defineAlemonConfig, analysis } from 'alemonjs'
import { login } from './a.login.config.js'
// yunzai
import './global.js'
// alemonjs
const AlemonJS = '[AlemonJS]'
console.log('-------------------------')
console.log(AlemonJS, 'DOCS')
console.log('https://alemonjs.com')
console.log('-------------------------')
console.log(AlemonJS, '热开发模式')
console.log(AlemonJS, 'npm run dev')
console.log('-------------------------')
export default defineAlemonConfig({
  login: analysis(login),
  app: {
    init: false
  },
  // yunzai
  plugin: {
    directory: '/plugins',
    main: '/main',
    type: 'js'
  }
})
