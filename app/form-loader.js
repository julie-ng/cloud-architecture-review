const QuestionSchema = require('../schemas/question')
const FactorSchema = require('../schemas/factor')
const config = require('../schemas/config')

const CONTENT_DIR = '/guide'

export default class FormLoader {
	/**
	 * ================
	 *  Content Loader
	 * ================
	 * Fetches content from the markdown files and
	 * structures them in category/question/factors format
	 *
	 * @param {String} opts.dir content directory
	 * @param {*} opts.content nuxt $content
	 */
	constructor (opts = {}) {
		this.$content = opts.$content
	}

	/**
	 * Fetch All
	 * ---------
	 * Pre-fetches all Questions (without markdown body)
	 * for the /review page that lists all questions
	 *
	 * @public
	 * @returns {Array}
	 */
	async loadAll () {
		const categories = []
		for (const category of config.categoriesSorted) {
			const dir = config.contentDir + category
			const questions = await this.#fetchQuestionsAndFactors(dir)
			categories.push({
				name: category,
				questions: questions
			})
		}

		this.categories = categories
		return this.categories
	}

	/**
	 * Fetch Single Article
	 * --------------------
	 * Get whole article including Markdown body based on Router params
	 *
	 * @public
	 * @param {String} category, e.g. `requirements`
	 * @param {String} question, e.g. `tenancy`
	 * @returns {Object} full article (normalized as question) with normalized factors
	 */
	async fetchArticle (category, question) {
		const dir = this.#articleDir(category, question)
		const path = this.#articlePath(category, question)
		console.log('fetchArticle()')
		console.log('path', path)

		const article = await this.$content(path).fetch()
		const factors = await this.#fetchFactors({
			dir: dir,
			slugs: article.factors,
			withBody: true
		})
		// console.log('factors', factors)

		const result = QuestionSchema.normalize(article)
		result.factors = factors

		return result
	}

	/**
	 * Fetch All Questions
	 * -------------------
	 * Gets all Markdown content in a given Category directory
	 *
	 * @private
	 * @param {String} categoryDir, e.g. 'requirements'
	 * @returns {Array} normalized questions
	 */
	async #fetchQuestionsAndFactors (categoryDir) {
		const results = []
		const questions = await this.$content(categoryDir)
			.sortBy('path')
			.without(config.formWithoutProps)
			.fetch()

		console.log(questions)

		// Append factors
		for (const q of questions) {
			console.log('question', q)

			// Must fetch with `slugs`
			const factors = await this.#fetchFactors({
				dir: categoryDir,
				slugs: q.factors,
				withBody: false
			})

			// Now normalize for <input> forms
			const question = QuestionSchema.normalize(q)
			question.factors = factors
			results.push(question)
		}

		console.log('📑 Form Loader results')
		console.log(results)
		return results
	}

	/**
	 * Fetch Factors
	 * -------------
	 * for a given question per YAML front matter
	 *
	 * @private
	 * @param {String} opts.dir - Directory for factors
	 * @param {Array} opts.slugs, e.g. [{slug:'factors/foo'}, {slug:'factors/bar'}]
	 * @param {Boolean} opts.withBody - include factor markdown body
	 * @returns {Array} noramlized factors
	 */
	async #fetchFactors (opts = {}) {
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

	/**
	 * --------------------
	 *  Convention Helpers
	 * --------------------
	 */
	#articlePath (category, question) {
		return `${CONTENT_DIR}/${category}/${question}`
	}

	#articleDir (category, question) {
		return `${CONTENT_DIR}/${category}`
	}

	// currently not used b/c .md files have dirs in slugs
	// #factorsDir (category, question) {
	//   return `${CONTENT_DIR}/${category}/factors/${question}`
	// }
}
