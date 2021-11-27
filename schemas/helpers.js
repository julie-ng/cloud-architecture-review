module.exports = {
	only (obj, whitelistArray) {
		const result = {}
		whitelistArray.forEach((allowed) => {
			result[allowed] = obj[allowed]
		})
		return result
	},

	hasProp (obj, prop) {
		return Object.prototype.hasOwnProperty.call(obj, prop)
	}
}
