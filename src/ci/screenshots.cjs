/* eslint-disable */
const { chromium, devices } = require('playwright');

const base_url = process.argv[2];
const out_dir = process.argv[3] ? process.argv[3] : 'screenshots';
const endpoints = {
  Login: 'login',
  RouteList: '1d3dc3e03047b0c7',
  RouteActivity: '1d3dc3e03047b0c7/000000dd--455f14369d',
  SettingsActivity: '1d3dc3e03047b0c7/settings',
};

async function takeScreenshots(deviceType, context) {
  const page = await context.newPage()
  await page.goto(`${base_url}`)
  await page.click(`button:has-text('Try the demo')`)
  for (const endpoint in endpoints) {
    await page.goto(`${base_url}/${endpoints[endpoint]}`)
    await page.waitForTimeout(2000)
    await page.screenshot({path: `${out_dir}/${endpoint}-${deviceType}.playwright.png`})
    console.log(`${endpoint}-${deviceType}.playwright.png`)
  }
  await page.close()
}

(async () => {
  const browser = await chromium.launch()
  const iphone_13 = devices['iPhone 13']
  const mobile_context = await browser.newContext(iphone_13)
  await takeScreenshots('mobile', mobile_context)
  await mobile_context.close()

  const desktop_context = await browser.newContext({viewport: { width: 1920, height: 1080 }})
  await takeScreenshots('desktop', desktop_context)
  await desktop_context.close();
  await browser.close()
})()
