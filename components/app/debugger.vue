<template>
	<div>
		<h4>Decisions</h4>
		<pre>{{ decisions }}</pre>
	</div>
</template>

<script>
	export default {
		computed: {
			decisions () {
				return this.$store.getters.decisions
			}
		}
	}
</script>
