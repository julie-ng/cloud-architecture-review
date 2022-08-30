<template>
	<div>
		<section v-for="c of categories" :key=c.name>
			<!-- <pre>{{ categories }}</pre> -->
			<h1 class="category-title">{{ c.name }}</h1>
			<review-question
				v-for="topic of c.topics"
				:key=topic.slug
				:question=normalizeTopic(topic)
			>
			</review-question>
		</section>
	</div>
</template>

<script>
	const TopicSchema = require('../../schemas/topic')

	export default {
		computed: {
    	categories () {
      	return this.$store.getters['form/categories']
			}
		},

		methods: {
			normalizeTopic (questionObj) {
				return TopicSchema.normalize(questionObj)
				// return questionObj
			}
		}
	}
</script>

