<template>
	<review-form/>
</template>

<script>
	import FormLoader from '~/app/form-loader'

	export default {
		layout: 'app',
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
			const isLoaded = store.getters['form/isLoaded']
			if (!isLoaded) {
				const loader = new FormLoader({ $content: $content })
				const data = await loader.loadAll()
				store.commit('form/set', data)
			}

			return
		},

		// anchor does not exist until fully rendered
		// see in main.scss for offset value
		// document.querySelector('#dr').scrollIntoView({behavior: 'smooth'})
		async mounted () {
			if (location.hash) {
				await new Promise(r => setTimeout(r, 10)) // needed 😬
				document.querySelector(location.hash).scrollIntoView({ behavior: 'smooth' })
			}
		}
	}
</script>
