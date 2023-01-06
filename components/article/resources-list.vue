<template>
	<div>
		<h2>Resources Links</h2>
		<p>Below is a curated list of the most common docs and links on this topic that I share with people.</p>
		<ul>
			<li v-for="link of links" :key=link.id>
				<a :href=link.url target="_blank">{{ link.name }}</a><span v-if=link.note> - {{ link.note }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		description: {
			type: String,
			required: false
		},
		links: {
			type: Array,
			required: true,
		}
	}
}
</script>
