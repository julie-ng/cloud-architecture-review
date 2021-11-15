const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const jasmine = require('jasmine')
require('chromedriver')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000

const testUrl = process.env.SELENIUM_TARGET_URL || 'http://localhost:3000/'
const buildNo = process.env.APP_BUILD_SHA || '(Local Development)'

describe(`Deployment to ${testUrl}`, () => {
  let driver

  // Why Headless?
  // -------------
  // Note: in build agents, the browsers must run headlessly
  // for security reasons. For details, see:
  // https://stackoverflow.com/questions/50642308/webdriverexception-unknown-error-devtoolsactiveport-file-doesnt-exist-while-t
  beforeAll(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome.Options().headless())
      .build()
  })

  // Flakey - not clean, but build agents
  // are chucked when finished anyway 🤷‍♀️
  afterAll(async () => {
    await driver.close()
    await driver.quit()
  }, 15000)

  it('has correct Build #', async () => {
    let versionNo
    await driver.get(testUrl)

    if (testUrl.startsWith('http://localhost')) {
      versionNo = await driver.findElement(By.css('#js-build-no')).getText()
    } else {
      const el = await driver.findElement(By.css('#js-build-no')).getAttribute('href')
      const url = el.split('/')
      versionNo = url[url.length - 1]
    }
    expect(versionNo).toEqual(buildNo)
  })
})
