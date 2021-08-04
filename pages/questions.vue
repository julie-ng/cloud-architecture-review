<template>
	<section>
		<h1>Questions</h1>
    <article v-for="question of questions" :key="question.slug">
      <h2>{{ question.title }}</h2>
      <p>{{ question.description }}</p>
			<pre>
				{{ question.options }}
			</pre>
    </article>
	</section>
</template>

<script>
	export default {
		async asyncData({ $content, params}) {
			const questions = await $content('questions')
				.sortBy('path')
				.fetch()

			for (const q of questions) {
				let options = []

				for (const o of q.options) {
					let details = await $content({ deep: true })
						.where({ path: `/factors/${o.path}` })
						.without(['toc', 'body'])
						.fetch()
					options.push(details[0]) // dunno why where().fetch() is returning array not object
				}
				q.options = options
				console.log(options)
			}

			return {
				questions
			}
		}
	}
</script>
