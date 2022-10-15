/* eslint-disable object-shorthand */

export default {
	baseDir: '/guide/',

	categories: [
		'requirements',
		'networking'
	],

	sortOrder: {
		requirements: [
			'tenancy',
			'dr'
		],
		networking: [
			'model',
			'ingress'
		]
	},

	nextTopic (category, topicSlug) {
		const topics = this.sortOrder[category]
		const index = topics.findIndex(el => el === topicSlug)
		return topics[index + 1] === undefined
			? null
			: topics[index + 1]
	},

	previousTopic (category, topicSlug) {
		const topics = this.sortOrder[category]
		const index = topics.findIndex(el => el === topicSlug)
		return topics[index - 1] === undefined
			? null
			: topics[index - 1]
	}
}
