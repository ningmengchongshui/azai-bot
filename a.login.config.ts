import { LoginMap } from 'alemonjs'
import { OneBotLoginMap } from 'alemon-onebot'
export const login: LoginMap & OneBotLoginMap = {
  // 测试机懒得改,自己改成自己的
  test: {
    //
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
    //
    villa: {
      bot_id: 'bot_tl7fyj8YojTzhzWTICGY',
      secret: 'ibGutjhSx3mZISinUrPcmzKhEjheRr1TPpXjiFB6A4RWO',
      villa_id: 8488,
      pub_key:
        '-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCcw5zU/MD+HvVGKPYlI1VqtUK0\niaWfnSqdRCmsik2Q5zU6/bV5Cnp8Jog9XfZlkELR9cRfQDKlbM2YWEJKBXFlEoHg\n8/mOnJYxLhFhphx3H8bTbWOAXqPta5vs/mhx1DSZ8QWm6veql8RbLYalBsa0cZBM\nAXOJS+y0YTdkpztycQIDAQAB\n-----END PUBLIC KEY-----\n'
    },
    // one v12
    onebot: {
      url: '',
      access_token: ''
    }
  }
}
