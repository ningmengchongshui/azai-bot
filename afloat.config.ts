import { defineAfloat } from 'afloat'
export default defineAfloat({
  nodemon: {
    watch: ['alemon.*.{ts,js}', 'lib'],
    env: {
      // 自动读取.env文件
    }
  }
})
