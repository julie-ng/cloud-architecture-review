<template>
	<article>
		<h2>{{ question.title }}</h2>
		<p>{{ question.description }}</p>
		<p><strong>Chosen</strong>: {{ chosen }}</p>

		<factor-radio
			v-for="f of question.factors"
			:name=question.slug
			:key=f.slug
			:factor=f
		></factor-radio>

		<!-- <pre>{{ question }}</pre> -->
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
