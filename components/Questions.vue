<template>
	<section class="content">
		<h1>Questions</h1>
		<question
			v-for="question of questions"
			:key="question.slug"
			:question=question
		>
		</question>

		<!-- <pre>{{ questions }}</pre> -->
	</section>
</template>

<script>
	export default {
		props: {
			questions: {
				type: Array,
				required: true
			}
		}
	}
</script>
