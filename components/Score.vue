<template>
	<div>
		<h1>Score (debug)</h1>
		<table>
			<tr>
				<td>Complexity</td>
				<td>{{ score.complexity }}</td>
			</tr>
			<tr>
				<td>Operations</td>
				<td>{{ score.operations }}</td>
			</tr>
			<tr>
				<td>Security</td>
				<td>{{ score.security }}</td>
			</tr>
			<tr>
				<td>Price</td>
				<td>{{ score.price }}</td>
			</tr>
		</table>
	</div>
</template>


<script>
	export default {
		computed: {
    	score () {
      	return this.$store.getters.overallScore
			}
		}
	}
</script>

<style scoped>
	td:first-child {
		padding-right: 1em;
	}
</style>