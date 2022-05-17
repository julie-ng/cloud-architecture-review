<template>
	<div class="app-scoreboard">
		<div class="score">
			<h3 class="mb-0">Your Architecture Scores</h3>
			<p>How does an Azure Kubernetes Cluster with the selected criteria measure?</p>
			<score-pillar v-for="(score, category) in scores"
				:id=category
				:key=category
				:title=category
				:score=score
			>
			</score-pillar>
			<div class="score-details buttons">
				<div>
					<NuxtLink to="/review/score" class="button is-link">Understand Your Scores &rarr;</NuxtLink>
				</div>
				<div>
					<button class="button" @click="onClear">Reset All Answers</button>
				</div>
				<div class="sidebar-disclaimer">Note: this is not an official Microsoft assessment. <NuxtLink to="/about">Learn more</NuxtLink></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		computed: {
    	scores () {
      	return this.$store.getters['decisions/scores']
			}
		},

		methods: {
			onClear: function (event, store) {
				this.$store.commit('decisions/reset')
			}
		}
	}
</script>
