<template>
	<nav class="breadcrumb" aria-label="breadcrumbs">
		<ul>
			<li><NuxtLink to="/guide">Architecture Guide</NuxtLink></li>
			<li><NuxtLink :to=category>{{ category.shortTitle }}</NuxtLink></li>
			<li class="is-active"><a href="#" aria-current="page">{{ pageShortTitle }}</a></li>
		</ul>
	</nav>
</template>

<script>
export default {
	props: {
		category: Object,
		// categoryTitle: String,
		pageShortTitle: String
	}
}
</script>
