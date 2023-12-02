import { defineAfloat } from 'afloat'
export default defineAfloat({
  nodemon: {
    watch: ['a.*.{ts,js}', 'src', 'db'],
    env: {
      // discord
      DISCORD_API_REQUEST: 'dev',
      DISCORD_API_HEADERS: 'dev',
      DISCORD_API_CONFIG: 'dev',
      DISCORD_API_DATA: 'dev',
      // kook
      KOOK_API_REQUEST: 'dev',
      KOOK_API_HEADERS: 'dev',
      KOOK_API_CONFIG: 'dev',
      KOOK_API_DATA: 'dev',
      // villa
      VILLA_API_REQUEST: 'dev',
      VILLA_API_HEADERS: 'dev',
      VILLA_API_CONFIG: 'dev',
      VILLA_API_DATA: 'dev',
      // qq
      // ntqq
      NTQQ_API_REQUEST: 'dev',
      NTQQ_API_HEADERS: 'dev',
      NTQQ_API_CONFIG: 'dev',
      NTQQ_API_DATA: 'dev',
      // event
      ALEMONJS_EVENT: 'dev',
      // e
      ALEMONJS_MESSAGE: 'dev',
      NODE_ENV: 'development'
    }
  }
})
