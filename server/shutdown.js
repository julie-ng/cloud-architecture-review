module.exports = function (callback, logger) {
	process.on('SIGINT', callback)
	process.on('SIGTERM', callback)

	process.on('uncaughtException', (err) => {
		logger.error(`Uncaught Exception: ${err.message}`, err)
		process.exit(1)
	})

	process.on('unhandledRejection', (reason, promise) => {
		logger.error('Unhandled rejection at ', promise, `reason: ${reason}`)
		process.exit(1)
	})
}
