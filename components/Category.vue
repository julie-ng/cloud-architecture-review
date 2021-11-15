<template>
	<section class="content">
		<h1 class="category-title">{{ title }}</h1>
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
			title: {
				type: String,
				required: true
			},
			questions: {
				type: Array,
				required: true
			}
		}
	}
</script>
