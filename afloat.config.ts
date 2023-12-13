import { defineAfloat } from 'afloat'
export default defineAfloat({
  nodemon: {
    watch: ['a.*.{ts,js}', 'src', 'db'],
    env: {
      // discord
      DISCORD_API_DATA: 'dev',
      // kook
      KOOK_API_DATA: 'dev',
      // villa
      VILLA_API_DATA: 'dev',
      // qq
      // ntqq
      NTQQ_API_DATA: 'dev',
      // event
      ALEMONJS_EVENT: 'dev',
      // e
      ALEMONJS_MESSAGE: 'dev',
      NODE_ENV: 'development'
    }
  }
})
