<template>
	<section class="content">
		<h1 class="page-title">Azure Kubernetes Architect</h1>
		<score/>
		<hr>

		<decisions/>
		<hr>

		<h1>Questions</h1>
		<question
			v-for="question of questions"
			:key="question.slug"
			:question=question
		>
		</question>

		<!-- <pre>{{ questions }}</pre> -->
	</section>
</template>

<script>
	// Because nuxt content cannot process nested YAML front-matter
	// we have to manually extra the states to create a `points` object
	const STATS = [
		'complexity',
		'security',
		'price',
		'operations'
	]

	export default {
		async asyncData({ $content, params }) {
			// const factors = [] // ?

			// Get Questions
			const questions = await $content('questions')
				.sortBy('path')
				.fetch()

			// Get Options for Each Question
			for (const q of questions) {
				let factorData = q.factors
				q.factors = []

				for (const f of factorData) {
					const file = `/factors/${f.path}`
					const factor = await $content(file)
						.without(['toc', 'body'])
						.fetch()

					// Conslidate points into own stats object
					let points = {}
					STATS.forEach(s => {
						points[s] = factor[s]
						delete factor[s]
					})
					factor.stats = points

					// add to question
					q.factors.push(factor)
				}
			}



			// Debug
  		// const decisions = {
			// 	'tenancy': {
			// 		chosen: 'single-tenant',
			// 		stats: {}
			// 	},

			// 	'networking-model': {
			// 		chosen: 'azure-cni',
			// 		stats: {}
			// 	}
			// }

			// console.log('-- DECISIONS --', decisions)


			return {
				questions
				// factors
			}
		}
	}
</script>

<style>
	:root {
		--purple-color: #3752c7;
		--cherry-color: #e94d15;
		--body-text-color: #222;
		--body-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}

	body {
		font-family: var(--body-font);
		font-size: 1rem;
		color: var(--body-text-color);
	}

	h1 {
		font-size: 1.8rem;
	}

	h2 {
		color: var(--purple-color);
	}

	pre {
		background: #f1f1f1;
    padding: 1em;
	}

	.page-title {
		font-size: 2em;
		color: var(--cherry-color);
	}

	.content {
		margin: 1em auto;
		max-width:1024px;
	}
</style>