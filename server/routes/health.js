const healthcheck = require('standard-healthcheck')
const express = require('express')
const router = express.Router()
const version = require('../../package.json').version

router.get('/', healthcheck({
	version: version,
	description: process.env.npm_package_description,
	includeEnv: ['NODE_ENV', 'HOST', 'APP_BUILD_SHA']
}))

module.exports = router
