<template>
	<div>
		<!-- <h1>Dummy</h1>
		<pre>
			{{ dummy }}
		</pre> -->

		<h1>Decsisions (debug)</h1>

		<pre>
			<!-- {{ decisions }} -->
			{{ $store.getters.summary }}
		</pre>

	</div>
</template>


<script>
	export default {
		computed: {
			// dummy () {
			// 	return this.$store.state.dummy
			// },
			decisions () {
				return this.$store.state.decisions
			}
		}
	}
</script>
