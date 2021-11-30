export default  function (context) {
	if (process.env.NODE_ENV !== 'production') {
		const log = {
			path: context.route.path,
			hash: context.route.hash,
			router: context.route.matched[0].path,
			params: context.route.params,
			query: context.route.query
		}

		console.log('[Logging] Route Changed', log)

		// if (context.server) {
		// 	console.log('Got Request')
		// 	console.log(context.req.url, context.req.method, context.req.headers)
		// }
	}
}
