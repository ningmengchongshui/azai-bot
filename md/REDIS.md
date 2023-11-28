# REDIS 6379 ERR

> src/redis.ts

- 可能是 未启动

- 可能是 地址错误

```ts
export const redis: AlemonOptions['redis'] = {
  password: '',
  port: 6379,
  // 一般是 localhost 即可
  // 但某些时候需要改成
  host: '127.0.0.1',
  db: 0
}
```
