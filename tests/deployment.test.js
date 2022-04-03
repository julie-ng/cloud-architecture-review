const jasmine = require('jasmine')
const fetch = require('node-fetch')

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20 * 1000

const testUrl = process.env.SELENIUM_TARGET_URL || 'http://localhost:3000/'
const buildNo = process.env.APP_BUILD_SHA || 'abc123' // hash defined in package.json

describe(`Confirm Deployment to ${testUrl}`, () => {
	it('has correct Build #', async () => {
		// prevent double slashes at end of url
		const healthEndpoint = testUrl.replace(/\/$/, '') + '/health'

		const response = await fetch(healthEndpoint)
		const body = await response.text()

		expect(response.status).toEqual(200)
		expect(JSON.parse(body).details.env.APP_BUILD_SHA).toEqual(buildNo)
	})
})
