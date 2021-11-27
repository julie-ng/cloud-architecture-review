module.exports = {
	contentDir: '/guide/',

	categoriesSorted: [
		'requirements',
		'networking'
	],

	scoreDimensions: [
		'complexity',
		'security',
		'price',
		'operations'
	],

	factorAttrsRemove: [
		'toc',
		'extension',
		'createdAt',
		'updatedAt'
	],

	// These are not needed when generating form on /review page
	formWithoutProps: [
		'toc',
		'body',
		'extension',
		'createdAt',
		'updatedAt'
	],

	// for decisions
	questionExcerpted: [
		'path',
		'slug',
		'inputName',
		'shortTitle'
	],

	// for decisions
	factorExcerpted: [
		'path',
		'slug',
		'inputValue',
		'title',
		'points',
		'description'
	]
}
