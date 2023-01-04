<template>
<div class="message is-primary article-question">
	<div class="message-header">
		Review App
	</div>
	<div class="message-body">
		<article>
			<h2 class="mt-2 mb-0">{{ question.title }}</h2>
			<p>{{ question.description }}</p>
			<review-radio-input
				v-for="factor of factors"
				:name=question.inputName
				:key=factor.slug
				:factor=normalizeFactor(factor)
				@selected="updateDecision($event, $store, question)"
			></review-radio-input>

			<div class="mt-4">
				<button class="button is-small is-outlined" @click="removeDecision($store, question)">Reset</button>
			</div>
		</article>
	</div>
</div>
</template>

<script>
const FactorSchema = require('../../schemas/factor')
const DecisionSchema = require('../../schemas/decision')

	export default {
		props: {
			question: {
				type: Object,
				required: true
			},
			factors: {
				type: Array,
				required: true
			}
		},

		methods: {
			normalizeFactor: function (factorObj) {
				return FactorSchema.normalize(factorObj)
			},

			removeDecision: function (store, question) {
				store.commit('decisions/remove', question.inputName)
			},

			updateDecision: function (event, store, question) {
				// console.log('🔴 question.vue - decision')
				// console.log(decision)
				const decision = DecisionSchema.normalize(question, event.factor)
				store.commit('decisions/update', decision)
			}
		}
	}
</script>
