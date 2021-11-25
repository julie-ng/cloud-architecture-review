<template>
	<app-form/>
</template>

<script>
	import Experience from '~/architect/experience'

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

			const experience = new Experience({
				$content: $content
			})

			const data = await experience.load()
			console.log('Experience Loaded', data)

			store.commit('form/set', data)

			return
		},
	}
</script>
