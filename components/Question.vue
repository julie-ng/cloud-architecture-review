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
		></factor-radio>

		<!-- <pre>{{ question.slug }}</pre> -->
	</article>
</template>

<script>
	export default {
    data() {
      return {
        chosen: 'none'
      }
    },
		props: {
			question: {
				type: Object,
				required: true
			}
		}
	}
</script>
