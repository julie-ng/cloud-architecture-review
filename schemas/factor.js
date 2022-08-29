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
 * - nests score values under new `points` attribute
 * - removes `createdAt` and `updatedAt` attributes
 * - sets `inputValue` attribute as `slug`.
 */

class FactorSchema {
	constructor () {
		return this
	}

	/**
	 * Normalize
	 *
	 * removes all the unwanted properties
	 * nests scores under `points` property
	 */
	normalize (attrs) {
		let result = { ...attrs }

		result = this.#sanitize(result)

		if (!this.#hasPoints(result)) {
			result = this.#adjustPoints(result)
		}

		result.inputValue = _.hasProp(attrs, 'slug')
			? attrs.slug
			: result.path.split('/').pop()

		return result
	}

	/**
	 * Returns Name for <input> field
	 *
	 * currently just slug (not aware of category)
	 *
	 * @param {Object} attrs
	 * @returns {String}
	 */
	extractInputValue (attrs) {
		return attrs.slug
	}

	/**
	 * Removes unwanted properties from object
	 *
	 * @private
	 * @param {Object} attrs
	 * @returns {Object} without unwanted properties
	 */
	#sanitize (attrs) {
		const result = { ...attrs }
		config.factorAttrsRemove.forEach((prop) => {
			if (_.hasProp(result, prop)) {
				delete result[prop]
			}
		})
		return result
	}

	/**
	 * Nests scores
	 *
	 * under new `points` property
	 * e.g. security becomes points.security
	 *
	 * @private
	 * @param {Object} attrs
	 * @returns {Object}
	 */
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

	/**
	 * Checks if object already has `poiunts` property
	 *
	 * @private
	 * @param {Object} attrs
	 * @returns {Boolean}
	 */
	#hasPoints (attrs) {
		return _.hasProp(attrs, 'points') &&
			Object.keys(attrs.points).length > 0 // not empty
	}
}

const schema = new FactorSchema()
module.exports = schema
