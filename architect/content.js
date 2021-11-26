const CATEGORIES_ORDERED = [
	'requirements',
	'networking'
]

const SCORE_DIMENSIONS = [
	'complexity',
	'security',
	'price',
	'operations'
]

export default class ContentLoader {
	/**
	 *
	 * @param {String} opts.dir content directory
	 * @param {String} opts.undecidedTemplate defaults to 'undecided-default'
	 * @param {*} opts.content nuxt $content
	 */
	constructor (opts = {}) {
		this.$content = opts.$content
		this.dir = opts.dir || 'guide'
		this.undecidedTemplate = opts.undecidedTemplate || 'undecided-default'
	}

	async load () {
		// console.log('load()')
		this.undecidedDefault = await this.$content(`${this.dir}/${this.undecidedTemplate}`).fetch()

		const categories = []
		for (const category of CATEGORIES_ORDERED) {
			const topics = await this.#fetchTopics(category)
			categories.push({
				name: category,
				questions: topics // TODO rename questions
			})
		}

		this.categories = categories
		return this.categories
	}

	/**
	 * Gets all topics, e.g. tenancy for a given category, e.g. requirements
	 *
	 * @param {String} category
	 * @returns {Array}
	 */
	async #fetchTopics (category) {
		const topics = await this.$content(`${this.dir}/${category}`)
			.sortBy('path')
			.without(['toc', 'body'])
			.fetch()

		// console.log('#fetchTopics()', topics)
		for (const topic of topics) {
			const options = await this.#fetchFactors(topic)
			options.push(this.#newUndecided({ prefix: topic.slug }))
			topic.factors = options
		}

		return topics
	}

	/**
	 *
	 * @param {Object} topic
	 * @returns {Array}
	 */
	async #fetchFactors (topic) {
		// console.log('#fetchFactors()', topic)

		const options = topic.options // front matter uses 'options' key
		const factors = []
		for (const opt of options) {
			const data = await this.$content(`${topic.dir}/factors/${opt.slug}`)
				.without(['toc', 'body'])
				.fetch()
			factors.push(this.#adjustPointsSchema(data))
		}

		// console.log('#fetchFactors()', factors)
		return factors
	}

	/**
   * Lumps stats into `points` property and deletes,
   * e.g. ingress.complexity ==> ingress.points.complexity
   * Needed because nuxt-content does not support nested frontmatter
	 *
   * @param {Object} factor e.g. azure-cni…
   * @returns {Object}
   */
	#adjustPointsSchema (factor) {
		const points = {}
		SCORE_DIMENSIONS.forEach((s) => {
			points[s] = factor[s]
			delete factor[s]
		})

		return {
			...factor,
			points
		}
	}

	/**
	 * All factors need a unique slug
	 * Create a new object by prefix
	 *
	 * @param {String} opts.prefix - slug of topic
	 */
	#newUndecided (opts) {
		const copy = { ...this.undecidedDefault }
		return {
			...this.#adjustPointsSchema(copy),
			slug: `${opts.prefix}-undecided`
		}
	}
}
