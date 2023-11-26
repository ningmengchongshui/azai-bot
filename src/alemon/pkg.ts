import { readFileSync } from 'fs'
import { join } from 'path'
export function getJson(dir: string) {
  return JSON.parse(readFileSync(dir, 'utf-8'))
}
export function getVersion(dir: string) {
  const data = getJson(join(process.cwd(), dir))
  return data?.version
}
console.log('--------------------')
console.log('--------------------')
const version = getVersion('/node_modules/alemonjs/package.json')
console.log(`AlemonJS V${version}`)
console.log('https://alemonjs.com')
console.log('--------------------')
console.log('--------------------')
