<template>
	<div>
		<h1>Decisions (debug)</h1>
		<pre>
			<!-- {{ decisions }} -->
			{{ $store.getters.summary }}
		</pre>

	</div>
</template>

<script>
	export default {
		computed: {
			decisions () {
				return this.$store.state.decisions
			}
		}
	}
</script>
