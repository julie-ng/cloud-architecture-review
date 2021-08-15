<template>
	<article>
		<h2>{{ question.title }}</h2>
		<p>{{ question.description }}</p>

		<factor-radio
			v-for="f of question.factors"
			:inputName=question.slug
			:key=f.slug
			:factor=f
			:stats=f.stats

			@selected="onSelected($event, $store, question)"
			></factor-radio>

		<div class="factor">
			<label :for="question.slug + '-undecided'">
				<input type="radio"
					:name=question.slug
					:id="question.slug + '-undecided'"
					:key="question.slug + '-undecided'"
					:value="undecided"
					v-on:change="$store.commit('remove', question)"
				>
				<h4>Undecided</h4>
			</label>
		</div>
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
				console.log(`--- onSelected(${event.option.id}) ---`)

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


	.factor h4 {
		margin-bottom: 0.5em;
	}
</style>