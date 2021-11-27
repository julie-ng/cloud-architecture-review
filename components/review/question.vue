<template>
	<article class="question-box">
		<h2 class="question-title has-scroll-anchor" :id=question.slug>
			<NuxtLink :to=question.path>{{ question.title }}</NuxtLink>
		</h2>
		<p>{{ question.description }}</p>
		<review-radio-input
			v-for="factor of question.factors"
			:name=inputName
			:key=factor.slug
			:factor=factor
			@selected="updateDecision($event, $store, question)"
		></review-radio-input>

		<button class="question-reset-btn" @click="removeDecision($store, question)">Reset</button>

		<!-- <pre>{{ question }}</pre> -->
	</article>
</template>

<script>
	export default {
		props: {
			question: {
				type: Object,
				required: true
			}
		},

		computed: {
			inputName () {
				return this.question.path.replace('/guide/', '').split('/').join('-')
			}
		},

		methods: {
			removeDecision: function (store, question) {
				store.commit('decisions/remove', this.inputName)
			},

			updateDecision: function (event, store, question) {
				const factor = event.factor
				const decision = {
					inputName: this.inputName,
					inputValue: factor.slug,
					question: {
						path: question.path,
						shortTitle: question.short_title
					},
					selected: event.factor
				}
				store.commit('decisions/update', decision)
			}
		}
	}
</script>
