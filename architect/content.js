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
	 * @param {String} opts.dir content directory
	 * @param {*} opts.content nuxt $content
	 */
	constructor (opts = {}) {
		this.$content = opts.$content
		this.dir = opts.dir || 'guide'
	}

	async load () {
		const categories = []
		for (const category of CATEGORIES_ORDERED) {
			const questions = await this.#fetchQuestions(category)
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
	 * @param {String} category
	 * @returns {Array}
	 */
	async #fetchQuestions (category) {
		const questions = await this.$content(`${this.dir}/${category}`)
			.sortBy('path')
			.without(['toc', 'body'])
			.fetch()

		// console.log('#fetchQuestions()', questions)
		for (const question of questions) {
			const factors = await this.#fetchFactors(question)
			question.factors = factors
		}

		return questions
	}

	/**
	 *
	 * @param {Object} question
	 * @returns {Array}
	 */
	async #fetchFactors (question) {
		// console.log('#fetchFactors()', question)

		// const factors = question.factors // front matter uses 'factors' key
		const factors = []
		for (const f of question.factors) {
			const data = await this.$content(`${question.dir}/factors/${f.slug}`)
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
}
