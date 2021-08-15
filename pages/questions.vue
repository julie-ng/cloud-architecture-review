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
	export default {
		async asyncData({ $content, params }) {
			const undecidedTemplate = await $content('factors/undecided').fetch()

			// Fetch Questions
			const questions = await $content('questions')
				.sortBy('path')
				.without(['toc'])
				.fetch()

			// Fetch possible answers ("Factors") for each Question
			for (const q of questions) {
				const factors  = q.factors // required
				q.factors = []

				for (const f of factors) {
					let factor = await $content(`/factors/${f.path}`)
						.without(['toc', 'body'])
						.fetch()

					// add to possible answers
					q.factors.push(_formatStats(factor))
				}

				// add "undecided" option
				q.factors.push(_createUndecided(q, undecidedTemplate))
			}

			return {
				questions
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