<template>
	<review-form/>
</template>

<script>
	import FormLoader from '~/app/form-loader'
	import contentConfig from '~/app/content.config'

	console.log('contentConfig', contentConfig)

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


		// TODO: this breaks routing from review to guide pages :-(
		// not sure why though
		// -------------------
		// async asyncData({ $content, params, store }) {
		// 	// Prefer SSR load

		// 	// test
		// 	// const results = await $content('/guide/networking')
		// 	// 	.fetch()

		// 	// console.log('------------ results ---------')
		// 	// console.log(results)



		// 	const loader = new FormLoader({ $content: $content })
		// 	const data = await loader.load()
		// 	store.commit('form/set', data)

		// 	return
		// },

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
