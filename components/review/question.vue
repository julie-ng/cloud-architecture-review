<template>
	<article class="question-box">
		<h2 class="question-title has-scroll-anchor" :id=question.slug>
			<NuxtLink :to=question.path>{{ question.title }}</NuxtLink>
		</h2>
		<p>{{ question.description }} <NuxtLink :to=question.path>Learn more</NuxtLink></p>
		<review-radio-input
			v-for="factor of question.factors"
			:name=question.inputName
			:key=factor.slug
			:factor=normalizeFactor(factor)
			@selected="updateDecision($event, $store, question)"
		></review-radio-input>

		<button class="question-reset-btn" @click="removeDecision($store, question)">Reset</button>
	</article>
</template>

<script>
const FactorSchema = require('../../schemas/factor')
const DecisionSchema = require('../../schemas/decision')

	export default {
		props: {
			question: {
				type: Object,
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
