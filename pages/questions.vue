<template>
	<section>

		<score/>
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
					const factor = await $content(file, { deep: true })
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

			return {
				questions
				// factors
			}
		}
	}
</script>
