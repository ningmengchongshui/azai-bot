import dotenv from 'dotenv'
dotenv.config({ path: '.env' })
export const ALEMON_REDIS_host = process.env?.ALEMON_REDIS_host ?? 'localhost'
export const ALEMON_REDIS_port = Number(process.env?.ALEMON_REDIS_port) ?? 6379
export const ALEMON_REDIS_password = process.env?.ALEMON_REDIS_password ?? ''
export const ALEMON_REDIS_db = Number(process.env?.ALEMON_REDIS_db) ?? 1
