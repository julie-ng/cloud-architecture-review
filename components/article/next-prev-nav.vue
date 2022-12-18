<template>
	<div class="article-next-prev mb-5 pb-3 columns">
		<div class="column">
			<div v-if=prevTopic.path>
				<NuxtLink class="button is-link is-light" :to=prevTopic.path>
					<span>Previous</span>
					<span>&larr; {{ prevTopic.shortTitle }}</span>
				</NuxtLink>
			</div>
		</div>
		<div class="column">
			<div v-if=nextTopic.path>
				<NuxtLink class="button is-link is-light" :to=nextTopic.path>
					<span>Next</span>
					<span>{{ nextTopic.shortTitle }} &rarr;</span>
				</NuxtLink>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  props: {
    nextTopic: Object,
		prevTopic: Object,
  }
}
</script>