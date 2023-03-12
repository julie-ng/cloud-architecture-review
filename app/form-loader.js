import TopicSchema from '../schemas/topic'
import FactorSchema from '../schemas/factor'
import config from '../schemas/config'

const CONTENT_DIR = '/guide'

export default class FormLoader {
	/**
	 * ================
	 *  Content Loader
	 * ================
	 * Fetches content from the markdown files and
	 * structures them in category/topic/factors format
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
	 * Pre-fetches all Topics (without markdown body)
	 * for the /review page that lists all topics
	 *
	 * @public
	 * @returns {Array}
	 */
	async loadAll () {
		const categories = []
		for (const category of config.categoriesSorted) {
			const dir = config.contentDir + category
			const topics = await this.#fetchTopicsAndFactors(dir)
			categories.push({
				name: category,
				topics: topics
			})
		}

		this.categories = categories
		return this.categories
	}

	/**
	 * Fetch Single Article
	 * --------------------
	 * Get whole topic/article including Markdown body based on Router params
	 *
	 * @public
	 * @param {String} category, e.g. `requirements`
	 * @param {String} topic, e.g. `tenancy`
	 * @returns {Object} full article (normalized as topic) with normalized factors
	 */
	async fetchArticle (category, topic) {
		const dir = this.#articleDir(category, topic)
		const path = this.#articlePath(category, topic)
		// console.log('fetchArticle()')
		// console.log('path', path)

		const article = await this.$content(path).fetch()
		const factors = await this.#fetchFactors({
			dir: dir,
			slugs: article.factors,
			withBody: true
		})
		// console.log('factors', factors)

		const result = TopicSchema.normalize(article)
		result.factors = factors

		return result
	}

	/**
	 * Fetch All Topics
	 * -------------------
	 * Gets all Markdown content in a given Category directory
	 *
	 * @private
	 * @param {String} categoryDir, e.g. 'requirements'
	 * @returns {Array} normalized topics
	 */
	async #fetchTopicsAndFactors (categoryDir) {
		const results = []
		const topics = await this.$content(categoryDir)
			.sortBy('path')
			.without(config.formWithoutProps)
			.fetch()

		// console.log(topics)

		// Append factors
		for (const t of topics) {
			// console.log('topic', t)
			if (t.slug !== 'index' && t.factors) { // ignore category indexes & pages without questions
				const factors = await this.#fetchFactors({
					dir: categoryDir,
					slugs: t.factors, // Must fetch with `slugs`
					withBody: false
				})

				// Now normalize for <input> forms
				const topic = TopicSchema.normalize(t)
				topic.factors = factors
				results.push(topic)
			}
		}

		console.log('📑 Form Loader results')
		console.log(results)
		return results
	}

	/**
	 * Fetch Factors
	 * -------------
	 * for a given topic per YAML front matter
	 *
	 * @private
	 * @param {String} opts.dir - Directory for factors
	 * @param {Array} opts.slugs, e.g. [{slug:'factors/foo'}, {slug:'factors/bar'}]
	 * @param {Boolean} opts.withBody - include factor markdown body
	 * @returns {Array} noramlized factors
	 */
	async #fetchFactors (opts = {}) {
		// console.log('fetchFactors()', opts.slugs)
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
	#articlePath (category, topic) {
		return `${CONTENT_DIR}/${category}/${topic}`
	}

	#articleDir (category, topic) {
		return `${CONTENT_DIR}/${category}`
	}

	// currently not used b/c .md files have dirs in slugs
	// #factorsDir (category, topic) {
	//   return `${CONTENT_DIR}/${category}/factors/${topic}`
	// }
}
