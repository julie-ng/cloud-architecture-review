const QuestionSchema = require('../schemas/question')
const FactorSchema = require('../schemas/factor')
const config = require('../schemas/config')

export default class FormLoader {
	/**
	 * @param {String} opts.dir content directory
	 * @param {*} opts.content nuxt $content
	 */
	constructor (opts = {}) {
		this.$content = opts.$content
	}

	async load () {
		const categories = []
		for (const category of config.categoriesSorted) {
			const dir = config.contentDir + category
			const questions = await this.#fetchQuestions(dir)

			categories.push({
				name: category,
				questions: questions
			})
		}

		this.categories = categories
		return this.categories
	}

	/**
	 * Gets all questions, e.g. tenancy for a given category, e.g. requirements
	 *
	 * @param {String} categoryDir
	 * @returns {Array}
	 */
	async #fetchQuestions (categoryDir) {
		const results = []
		const questions = await this.$content(categoryDir)
			.sortBy('path')
			.without(config.formWithoutProps)
			.fetch()

		// append factors
		for (const q of questions) {
			const question = QuestionSchema.normalize(q)
			const factors = await this.#fetchFactors(question.factors)
			question.factors = factors

			results.push(question)
		}

		// console.log('📑 Form Loader results')
		// console.log(results)
		return results
	}

	/**
	 * @param {String} dir - where factors are
	 * @param {Array} factors
	 * @returns {Array}
	 */
	async #fetchFactors (factors) {
		const results = []
		for (const f of factors) {
			const data = await this.$content(f.path)
				.without(config.formWithoutProps)
				.fetch()

			const factor = FactorSchema.normalize(data)
			results.push(factor)
		}
		return results
	}
}
