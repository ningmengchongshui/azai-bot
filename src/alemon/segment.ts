import { getPathBuffer } from 'alemonjs'
const ars = process.argv.slice(2)
const segment = {
  /**
   * 图片
   * @param val
   * @returns
   */
  image: (val: string | Buffer) => {
    // buffer
    if (Buffer.isBuffer(val)) return val
    // path
    const img = getPathBuffer(val)
    if (img) return img
    // url
    if (/^(http|https)/.test(val)) {
      return `<http>${val}</http>`
    }
    // isBase64
    if (/^base64:\/\//.test(val)) {
      return Buffer.from(val.replace(/^base64:\/\//, ''), 'base64')
    }
    return val
  },
  /**
   * 视频
   * @param val
   * @returns
   */
  video: (val: Buffer) => `[video](${val})`,
  /**
   * at用户
   * @param  uid
   * @returns
   */
  at: (uid: string) => {
    if (ars.includes('villa')) {
      if (uid == 'all') return `<@!everyone>`
      return `<@!${uid}>`
    }
    if (ars.includes('qq')) {
      if (uid == 'all') return `<@everyone>`
      return `<@${uid}>`
    }
    if (ars.includes('ntqq')) {
      if (uid == 'all') return `@everyone`
      return `<@${uid}>`
    }
    if (ars.includes('kook')) {
      if (uid == 'all') return `(met)all(met)`
      return `(met)${uid}(met)`
    }
    if (ars.includes('discord')) {
      if (uid == 'all') return `@everyone`
      return `<@${uid}>`
    }
    return ''
  },
  /**
   * 语音
   * @param val
   * @returns
   */
  record: (val: Buffer | string) => {
    // buffer
    if (Buffer.isBuffer(val)) return val
    // path
    const img = getPathBuffer(val)
    if (img) return img
    // url
    if (/^(http|https)/.test(val)) {
      return `<http>${val}</http>`
    }
    // isBase64
    if (/^base64:\/\//.test(val)) {
      return Buffer.from(val.replace(/^base64:\/\//, ''), 'base64')
    }
    // url
    return val
  }
}
global.segment = segment
