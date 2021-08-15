<template>
	<article>
		<h2>{{ question.title }}</h2>
		<p>{{ question.description }}</p>
		<!-- <pre>
{{ question }}
		</pre> -->

		<factor-radio
			v-for="f of question.factors"
			:inputName=question.slug
			:key=f.slug
			:factor=f
			:stats=f.stats
			@selected="onSelected($event, $store, question)"
			></factor-radio>
	</article>
</template>

<script>
	export default {
		// Properties
		// ----------
		props: {
			question: {
				type: Object,
				required: true
			}
		},

		// Methods
		// -------
		methods: {
			onSelected: function (event, store, question) {
				store.commit('update', {
					question: question,
					answer: {
						id: event.option.id
					}
				})
			},
		}
	}
</script>


<style>
	article {
		margin-bottom: 3em;
	}
</style>