import { PuppeteerLaunchOptions } from 'puppeteer'
export const Options: PuppeteerLaunchOptions = {
  headless: 'new',
  args: [
    '--disable-gpu',
    '--disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process'
  ]
}
