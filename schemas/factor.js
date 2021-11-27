const config = require('./config')
const _ = require('./helpers')

/**
 * FactorSchema - Singleton
 *
 * Schema wrapper that normalizes the markdown data into
 * an object. Nuxt.js content only supports 1 level of front matter.
 * So here we lump together the points values into its own attribute,
 * e.g. `complexity` becomes `points.complexity`
 *
 * Also sets <input> value based on `slug`.
 */

class FactorSchema {
	constructor () {
		return this
	}

	normalize (attrs) {
		let result = { ...attrs }

		result = this.#sanitize(result)
		if (!this.#hasPoints(result)) {
			result = this.#adjustPoints(result)
		}
		result.inputValue = attrs.slug
		return result
	}

	extractInputValue (attrs) {
		return attrs.slug
	}

	#sanitize (attrs) {
		const result = { ...attrs }
		config.factorAttrsRemove.forEach((prop) => {
			if (_.hasProp(result, prop)) {
				delete result[prop]
			}
		})
		return result
	}

	#adjustPoints (attrs) {
		const result = { ...attrs }
		const points = {}
		config.scoreDimensions.forEach((s) => {
			if (_.hasProp(result, s)) {
				points[s] = result[s]
				delete result[s]
			}
		})
		result.points = points
		return result
	}

	#hasPoints (attrs) {
		return _.hasProp(attrs, 'points') &&
			Object.keys(attrs.points).length > 0 // not empty
	}
}

const schema = new FactorSchema()
module.exports = schema
