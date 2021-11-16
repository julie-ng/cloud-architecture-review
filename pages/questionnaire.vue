<template>
	<div class="app-container">
		<app-header/>

		<div class="app-main wrapper">
			<div class="app-body">
				<category
					v-for="cat of questionnaire"
					:title=cat.name
					:key=cat.name
					:questions=cat.questions
				>
				</category>

				<!-- <pre>{{ questionnaire }}</pre> -->
			</div>
			<div class="app-sidebar">
				<score/>
			</div>
		</div>
		<app-footer/>
	</div>
</template>

<script>
	const content = [] // content db

	// Setup: Load order for ./contents/questions folder
	const categoryDirs = [
		'requirements',
		'networking'
	]

	export default {
		/**
		 * Fetch and load Markdown Content
		 * Loads only title and metadata without body
		 * Sort order set in `categoryDirs` above. Also easer than
		 * traversing directory and prefixing everything with numbers
		 *
		 * @async
		 * @returns {Array} of all questions and questions per defined sort order
		 */
		async asyncData({ $content, params }) {
			const undecidedTemplate = await $content('factors/undecided').fetch()

			// --- Questions per Category ---
			for (const c of categoryDirs) {
				const questions = await $content(`questions/${c}`)
					.sortBy('path')
					.without(['toc', 'body'])
					.fetch()

				// --- Answers per Question ---
				for (const q of questions) {
					const factors  = q.factors // required, defined in question markdown
					q.factors = []
					for (const f of factors) {
						let factor = await $content(`/factors/${f.path}`)
							.without(['toc', 'body'])
							.fetch()

						// Add to possible answers
						q.factors.push(_formatStats(factor))
					}

					// Add "undecided" option
					q.factors.push(_createUndecided(q, undecidedTemplate))
				}

				// Add to content db
				content.push(questions)
			}

			let questionnaire = []
			categoryDirs.forEach((c, i) => {
				questionnaire.push({
					name: c,
					questions: content[i]
				})
			})

			return {
				questionnaire
			}
		},
	}

	// Helpers
	// -------

	// Because nuxt content cannot process nested YAML front-matter
	// we have to manually extra the states to create a `points` object
	const STATS = [
		'complexity',
		'security',
		'price',
		'operations'
	]

	/**
	 * Lumps stats into `stats` property and deletes,
	 * e.g. foo.complexity ==> foo.stats.complexity
	 * Needed because nuxt-content does not support nested frontmatter
	 *
	 * @param factor {Object}
	 * @returns {Object}
	 */
	function _formatStats (factor) {

		let stats = {}
		STATS.forEach(s => {
			stats[s] = factor[s]
			delete factor[s]
		})
		factor.stats = stats
		return factor
	}

	/**
	 * Need a unique slug by prefixing with parent question's slug
	 *
	 * @param question {Object}
	 * @param template {Object} Base object content, usu. from factors/undecided.md
	 * @return {Object}
	 */
	function _createUndecided (question, template) {
		let copy = {...template}
		return {
			..._formatStats(copy),
			slug: `${question.slug}-undecided`
		}
	}
</script>

