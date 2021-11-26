<template>
	<div>
		<section v-for="c of categories" :key=c.name>
			<h1 class="category-title">{{ c.name }}</h1>
			<review-question
				v-for="q of c.questions"
				:key=q.slug
				:question=q
			>
			</review-question>
			<!-- <pre>{{ c.questions }}</pre> -->
		</section>

		<!-- <pre>{{ categories }}</pre> -->
	</div>
</template>

<script>
	export default {
		computed: {
    	categories () {
      	return this.$store.getters['form/categories']
			}
		}
	}
</script>

