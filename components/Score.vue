<template>
	<div class="score">
		<h1>Score</h1>
		<p>How does an Azure Kubernetes Cluster with the selected criteria measure relatively?</p>
		<score-meter v-for="(score, category) in scores"
			:id=category
			:key=category
			:title=category
			:score=score
		>
		</score-meter>
		<div class="details">
			<p>Higher is not better. As a startup you may do not need a security and complexity required in healthcare industries.</p>
			<p>
				<a href="#">What do these scores mean?</a>
			</p>
		</div>
	</div>
</template>


<script>
	export default {
		computed: {
    	scores () {
      	return this.$store.getters.overallScore
			}
		}
	}
</script>

<style scoped>
	td:first-child {
		padding-right: 1em;
	}

	.score {
		background-color: #f8f8f8;
		padding: 0.5rem 1rem;
	}

	p {
		font-size: var(--sm-font-size);
	}

	h1 {
		font-size: var(--lg-font-size);
	}
</style>