<template>
	<div class="app-scoreboard">
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
			<div class="score-details">
				<div>
					<a href="#" class="btn btn-primary">Understand Your Score</a>
				</div>
				<div>
					<button class="btn btn-primary-outline" @click="onClear">Reset All Values</button>
				</div>
				<p>Higher is not better. As a startup you may do not need a security and complexity required in healthcare industries.</p>
				<p>
					<a href="#">What do these scores mean?</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
    	scores () {
      	return this.$store.getters['decisions/overallScore']
			}
		},

		methods: {
			onClear: function (event, store) {
				this.$store.commit('decisions/reset')
			}
		}
	}
</script>
