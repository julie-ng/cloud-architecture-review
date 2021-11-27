<template>
	<div>
		<section v-for="c of categories" :key=c.name>
			<!-- <pre>{{ c.questions }}</pre> -->
			<!-- <pre>{{ categories }}</pre> -->
			<h1 class="category-title">{{ c.name }}</h1>
			<review-question
				v-for="q of c.questions"
				:key=q.slug
				:question=normalizeQuestion(q)
			>
			</review-question>
		</section>
	</div>
</template>

<script>
	const QuestionSchema = require('../../schemas/question')

	export default {
		computed: {
    	categories () {
      	return this.$store.getters['form/categories']
			}
		},

		methods: {
			normalizeQuestion (questionObj) {
				return QuestionSchema.normalize(questionObj)
				// return questionObj
			}
		}
	}
</script>

