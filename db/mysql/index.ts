/**
 * *******************
 * 新建数据库
 * alemonjs
 * 编码选择
 * utf8mb4
 * utf8mb4_general_ci
 * 执行amin.sql
 * *******************
 */
import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
dotenv.config({ path: '.env' })
const ALEMON_MYSQL_host = process.env?.ALEMON_MYSQL_host ?? 'localhost'
const ALEMON_MYSQL_port = Number(process.env?.ALEMON_MYSQL_port) ?? 3306
const ALEMON_MYSQL_user = process.env?.ALEMON_MYSQL_user ?? 'root'
const ALEMON_MYSQL_password = process.env?.ALEMON_MYSQL_password ?? 'Qq002580!'
const ALEMON_MYSQL_database = process.env?.ALEMON_MYSQL_database ?? 'alemonjs'
// 创建实例
export const sequelize = new Sequelize(
  ALEMON_MYSQL_database,
  ALEMON_MYSQL_user,
  ALEMON_MYSQL_password,
  {
    host: ALEMON_MYSQL_host,
    port: ALEMON_MYSQL_port,
    dialect: 'mysql',
    logging: false // 禁用日志记录
  }
)
export const TableConfig = {
  freezeTableName: true, //不增加复数表名
  createdAt: false, //去掉
  updatedAt: false //去掉
}
export { Op, literal } from 'sequelize'
