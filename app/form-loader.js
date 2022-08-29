const QuestionSchema = require('../schemas/question')
const FactorSchema = require('../schemas/factor')
const config = require('../schemas/config')

const CONTENT_DIR = '/guide'

export default class FormLoader {
	/**
	 * @param {String} opts.dir content directory
	 * @param {*} opts.content nuxt $content
	 */
	constructor (opts = {}) {
		this.$content = opts.$content
	}

	async load () {
		console.log('load()')
		const categories = []
		for (const category of config.categoriesSorted) {
			const dir = config.contentDir + category
			console.log('dir', dir)
			// const questions = await this.#fetchQuestions(dir)
			// console.log('questions', questions)
			// categories.push({
			// 	name: category,
			// 	questions: questions
			// })
		}

		this.categories = categories
		return this.categories
	}

	/**
	 * Fetch Article Markdown based on router params
	 *
	 * @param {String} category, e.g. `requirements`
	 * @param {String} question, e.g. `tenancy`
	 */
	async fetchArticle (category, question) {
		const dir = this.#articleDir(category, question)
		const path = this.#articlePath(category, question)
		console.log('fetchArticle()')
		console.log('path', path)

		const article = await this.$content(path).fetch()
		// console.log('article', article)

		const factors = await this.#fetchFactors({
			dir: dir,
			slugs: article.factors,
			withBody: true
		})

		// console.log('factors???', factors)

		article.factors = factors

		return article
	}


	#articlePath (category, question) {
		return `${CONTENT_DIR}/${category}/${question}`
	}

	#articleDir (category, question) {
		return `${CONTENT_DIR}/${category}`
	}

	// currently not used b/c .md files have dirs in slugs
	#factorsDir (category, question) {
		return `${CONTENT_DIR}/${category}/factors/${question}`
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

		console.log('#fetchQuestions #########')
		console.log(questions)

		// append factors
		for (const q of questions) {
			const question = QuestionSchema.normalize(q)
			// const factors = await this.#fetchFactors(question.factors)
			// const factors = await this.#fetchFactors({
			// 	dir: dir,
			// 	slugs: q.factors,
			// 	withBody: false
			// })
			// question.factors = factors

			results.push(question)
		}

		console.log('📑 Form Loader results')
		console.log(results)
		return results
	}

	/**
	 * @param {String} opts.dir - Directory for factors  e.g. `/guide/requirements/factors/dr`
	 * @param {Array} opts.slugs, e.g. [{slug:'factors/foo'}, {slug:'factors/bar'}]
	 * @param {Boolean} opts.withBody - include factor markdown body
	 * @returns {Array}
	 */
	async #fetchFactors (opts={}) {
		console.log('fetchFactors()', opts.slugs)
		const withoutProps = opts.withBody
			? config.factorAttrsRemove
			: config.formWithoutProps

		const results = []
		for (const f of opts.slugs) {
			const data = await this.$content(opts.dir + '/' + f.slug)
				.without(withoutProps)
				.fetch()

			const factor = FactorSchema.normalize(data)
			results.push(factor)
		}
		return results
	}
}
