/**
 * *********
 * yunzai
 * *********
 */
import Plugins from '../../plugins/plugin.js'
import renderer from '../../renderer/Renderer.js'
declare global {
  var plugin: typeof Plugins
}
global.plugin = Plugins
declare global {
  var Renderer: typeof renderer
}
global.Renderer = renderer
/**
 * V2转义成V3
 * @param rule V2指令对象
 * @param sourceObject v2插件文件对象
 * @returns calss
 */
const assignPropertiesAndMethods = (rules: any, sourceObject: any) => {
  const rule = Object.keys(rules).map(item => ({
    ...rules[item],
    fnc: item
  }))
  class APP extends plugin {
    constructor() {
      super({
        rule
      })
    }
  }
  const propertyNames = Object.getOwnPropertyNames(sourceObject)
  propertyNames.forEach(propertyName => {
    const descriptor = Object.getOwnPropertyDescriptor(
      sourceObject,
      propertyName
    )
    if (descriptor) {
      Object.defineProperty(APP.prototype, propertyName, descriptor)
    }
  })
  return APP
}
declare global {
  var YUNZAIV2: typeof assignPropertiesAndMethods
}
global.YUNZAIV2 = assignPropertiesAndMethods
