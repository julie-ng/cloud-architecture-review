import config from './config'
import _ from './helpers'

/**
 * Topic Schema
 *
 * - adds `inputName` attribute
 * - `slugs` Array - adds `path` to objects
 * - removes `extension` attribute
 */
class TopicSchema {
	constructor () {
		return this
	}

	normalize (attrs) {
		// console.log('normalize()')
		let result = { ...attrs }
		result = this.#expandFactorPaths(result)
		result = this.#removeExtension(result)
		result.inputName = this.#extractInputName(attrs.path)
		// console.log(result)
		return result
	}

	extractInputName (attrs) {
		return this.#extractInputName(attrs.path)
	}

	#expandFactorPaths (attrs) {
		// console.log('#expandFactorPaths()')
		// console.log(attrs)
		const copy = { ...attrs }
		for (const f of copy.factors) {
			f.path = copy.dir + '/factors/' + f.slug
			// delete f.slug // 🐞 keep for now. otherwise vuex throws errors
			// 🐞 used later for factor IDs, form name
		}

		return copy
	}

	#extractInputName (questionPath) {
		return questionPath.replace(config.contentDir, '').split('/').join('-')
	}

	#removeExtension (attrs) {
		if (_.hasProp(attrs, 'extension')) {
			const copy = { ...attrs }
			delete copy.extension
			return copy
		} else {
			return attrs
		}
	}
}

const schema = new TopicSchema()
module.exports = schema
