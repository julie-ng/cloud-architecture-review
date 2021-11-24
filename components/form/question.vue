<template>
	<article class="question-box">
		<h2 class="question-title"><NuxtLink :to=question.path>{{ question.title }}</NuxtLink></h2>
		<p>{{ question.description }}</p>
		<form-input-radio
			v-for="f of question.factors"
			:category=category
			:question=question
			:key=f.slug
			:factor=f
			:stats=f.stats

			@selected="onSelected($event, $store, category, question)"
			></form-input-radio>
	</article>
</template>

<script>
	export default {
		props: {
			question: {
				type: Object,
				required: true
			},

			category: {
				type: String,
				required: true
			}
		},

		computed: {
			decisions () {
				return this.$store.getters.decisions
			}
		},

		methods: {
			onSelected: function (event, store, category, question) {
				/**
				 * event.selected.id ==> answer slug
				 * event.selected.stats
				 */
				const selected = event.selected
				const mutation = selected.factor_id.substr(selected.factor_id.length - 9) == 'undecided'
					? 'REMOVE_DECISION'
					: 'UPDATE_DECISION'

				store.commit(mutation, {
					category: category,
					question: question,
					answer: event.selected
				})
			}
		}
	}
</script>
