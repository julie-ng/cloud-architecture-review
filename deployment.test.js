const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')

const testUrl = process.env.SELENIUM_TARGET_URL || 'http://localhost:3000'
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

  test('has correct Build #', async () => {
    await driver.get(testUrl)
    const footerBuildNo = await driver.findElement(By.css('#js-build-no')).getText()
    expect(footerBuildNo).toEqual(buildNo)
  })
})
