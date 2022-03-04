const { Builder, By } = require('selenium-webdriver')
const chrome = require('selenium-webdriver/chrome')
const jasmine = require('jasmine')
require('chromedriver')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000

const testUrl = process.env.SELENIUM_TARGET_URL || 'http://localhost:3000/'
const buildNo = process.env.APP_BUILD_SHA || 'b442611-test' // hash defined in package.json

describe(`Deployment to ${testUrl}`, () => {
	let driver

	// Why Headless?
	// -------------
	// Note: in build agents, the browsers must run headlessly
	// for security reasons. For details, see:
	// https://stackoverflow.com/q/50642308/6906366
	//
	// Why No-Sandbox?
	// ---------------
	// For security reasons chrome is unable to provide sandboxing
	// when it is running in container-based environments, see:
	// https://stackoverflow.com/a/59154049/6906366
	// This seems to also apply for running in WSL1
	beforeAll(async () => {
		const options = new chrome.Options().addArguments(
			'--headless',
			'--no-sandbox'
		)
		driver = await new Builder()
			.forBrowser('chrome')
			.setChromeOptions(options)
			.build()
	})

	// Flakey - not clean, but build agents
	// are chucked when finished anyway 🤷‍♀️
	afterAll(async () => {
		await driver.close()
		await driver.quit()
	}, 15000)

	it('has correct Build #', async () => {
		// prevent double slashes at end of url
		const healthEndpoint = testUrl.replace(/\/$/, '') + '/health'

		await driver.get(healthEndpoint)

		const content = await driver.findElement(By.css('pre')).getText()
		const healtData = JSON.parse(content)

		expect(healtData.details.env.APP_BUILD_SHA).toEqual(buildNo)
	})
})
