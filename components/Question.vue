<template>
	<article>
		<h2>{{ question.title }}</h2>
		<p>{{ question.description }}</p>
		<p><strong>Chosen (how to get value from child component?)</strong>: {{ chosen }}</p>

		<factor-radio
			v-for="f of question.factors"
			:inputName=question.slug
			:key=f.slug
			:factor=f
			:stats=f.stats
			@selected="onChange($event)"
		></factor-radio>

		<!-- <pre>{{ question.slug }}</pre> -->
	</article>
</template>

<script>
	export default {

		// Data
		// ----
    data() {
      return {
        chosen: 'none'
      }
    },

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
			onChange(event) {
				console.log(`QUESTION(${this.question.slug}): selected "${event.option.id}"`, event.option.stats)

				// Go into state, update/remove factor
			}
		}
	}
</script>
