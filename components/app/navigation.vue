<template>
	<div class="app-navigation">
		<ul v-for="category of categories" :key=category.name class="app-navigation-category">
			<li>
				<h3 class="app-navigation-title">{{ category.name }}</h3>
				<ul v-for="question of category.questions" :key=question.id class="app-navigation-questions">
					<li>
						<NuxtLink :to=guideLink(category.name,question.slug)>{{ question.short_title }}</NuxtLink>
					</li>
				</ul>
			</li>
		</ul>

	</div>
</template>


<script>
	export default {
		computed: {
    	categories () {
      	return this.$store.getters['form/categories']
			}
		},

		methods: {
			guideLink (cat, question) {
				return `/guide/${cat}/${question}`
			}
		}
	}
</script>
