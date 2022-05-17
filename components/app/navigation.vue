<template>
	<div class="app-navigation no-underlined-links is-size-6">
		<ul v-for="category of categories" :key=category.name class="app-navigation-category">
			<li>
				<h3 class="app-navigation-title is-size-6">{{ category.name }}</h3>
				<ul v-for="question of category.questions" :key=question.id class="app-navigation-questions">
					<li>
						<NuxtLink :to=guideLink(category.name,question.slug)>{{ question.shortTitle }}</NuxtLink>
					</li>
				</ul>
			</li>
		</ul>
		<p class="sidebar-disclaimer">Note: this a work-in-progress and incomplete list.</p>
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
