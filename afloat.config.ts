import { defineAfloat } from 'afloat'
export default defineAfloat({
  nodemon: {
    watch: ['a.*.{ts,js}', 'src', 'db'],
    env: {
      // 自动读取.env文件
    }
  }
})
