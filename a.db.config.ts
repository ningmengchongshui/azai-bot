import { AlemonOptions } from 'alemonjs'
/**
 * *********************
 * redis自动连接(请确保已安装)
 * *********************
 * mysql非必要不需要安装
 * *********************
 */
export const redis: AlemonOptions['redis'] = {
  password: '',
  port: 6379,
  host: '127.0.0.1',
  db: 0
}
export const mysql: AlemonOptions['mysql'] = {
  user: 'root',
  port: 3306,
  password: 'Qq002580!',
  host: 'localhost',
  database: 'alemonjs'
}
