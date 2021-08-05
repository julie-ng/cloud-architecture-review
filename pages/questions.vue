<template>
	<section>

		<h1>Score</h1>
		<table>
			<tr>
				<td>Complexity</td>
				<td>{{ score.complexity }}</td>
			</tr>
			<tr>
				<td>Operations</td>
				<td>{{ score.operations }}</td>
			</tr>
			<tr>
				<td>Security</td>
				<td>{{ score.security }}</td>
			</tr>
			<tr>
				<td>Price</td>
				<td>{{ score.price }}</td>
			</tr>
		</table>

		<button @click="$store.commit('update', {
			complexity: 5,
			operations: 2,
			security: -2,
			price: 1,
		})">Test Update</button>

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
	// import { mapMutations } from 'vuex'
	export default {
		async asyncData({ $content, params }) {
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
		},

		computed: {
    	score () {
      	return this.$store.state.score
			}
		},
	}
</script>
