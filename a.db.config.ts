import { AlemonOptions } from 'alemonjs'
export const mysql: AlemonOptions['mysql'] = {
  user: 'root',
  port: 3306,
  password: 'Qq002580!',
  host: 'localhost',
  database: 'alemonjs'
}
export const redis: AlemonOptions['redis'] = {
  password: '',
  port: 6379,
  host: 'localhost',
  db: 1
}
