import { LoginMap } from 'alemonjs'
/**
 * alemonjs配置教程
 * https://alemonjs.com/alemon/v2.x/examples/introduction/config.html
 */
export const login: LoginMap = {
  test: {
    // 测试机懒得改,自己改成自己的
    qq: {
      // 账号
      appID: '102040992',
      // 密码
      token: 'u0uLJaDSA1knHQx6Y1iY7M5LafDjwmik',
      // 不是私域(即公域)
      isPrivate: false,
      // 主人账号(不会看的可机器人带上@自己就会显示用户账号)
      masterID: '13348342918169126729'
    },
    // oneBot 连接
    one: {
      url: '',
      access_token: ''
    }
  }
}
