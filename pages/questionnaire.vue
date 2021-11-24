<template>
	<div class="app-container">
		<app-header/>
		<!-- <app-debugger/> -->
		<div class="app-main wrapper">
			<div class="app-body">
				<form-main/>
			</div>
			<div class="app-sidebar">
				<score/>
			</div>
		</div>

		<app-footer/>
	</div>
</template>

<script>
	import helper from '~/utils/stats-formatter'
	const formContent = [] // TODO: cache on server side

	// Load order for ./contents/questions folder
	const categoryDirs = [
		'requirements',
		'networking'
	]

	export default {
		/**
		 * [SSR] Fetch and load Markdown Content
		 * Loads only title and metadata without body
		 * Sort order set in `categoryDirs` above. Also easer than
		 * traversing directory and prefixing everything with numbers
		 *
		 * @async
		 * @returns {Array} of all questions and questions per defined sort order
		 */
		async asyncData({ $content, params, store }) {
			const undecidedTemplate = await $content('factors/undecided').fetch()

			// --- Questions per Category --- //
			for (const c of categoryDirs) {
				const questions = await $content(`questions/${c}`)
					.sortBy('path')
					.without(['toc', 'body'])
					.fetch()

				// --- Answers per Question --- //
				for (const q of questions) {
					const factors  = q.factors // required, defined in question markdown
					q.factors = []
					for (const f of factors) {
						let factor = await $content(`/factors/${f.path}`)
							.without(['toc', 'body'])
							.fetch()

						// Add to possible answers
						q.factors.push(helper.groupStats(factor))
					}

					// Add "undecided" option
					q.factors.push(helper.createUndecided(q, undecidedTemplate))
				}

				// Add to content db
				formContent.push(questions)
			}

			let categories = []
			categoryDirs.forEach((c, i) => {
				categories.push({
					name: c,
					questions: formContent[i]
				})
			})

			store.commit('SET_FORM', categories)
			return
		},
	}
</script>
