<template>
	<div class="app-navigation no-underlined-links is-size-6">
		<ul v-for="category of categories" :key=category.id class="app-navigation-category">
			<li>
				<h3 class="app-navigation-title is-size-6">{{ category.shortTitle }}</h3>

				<!-- BUG: topics order might not match -->
				<ul v-for="topic of category.topics" :key=topic.id class="app-navigation-questions">
					<li>
						<NuxtLink :to=topic>{{ topic.shortTitle }}</NuxtLink>
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>


<script>
	export default {
		props: {
			categories: {
				type: Array,
				default: []
			}
		},

		methods: {
			guideLink (cat, question) {
				return `/guide/${cat}/${question}`
			}
		}
	}
</script>
