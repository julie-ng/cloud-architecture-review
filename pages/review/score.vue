<template>
	<div class="score-results-page">
		<h1>Score Analysis</h1>
		<!-- <pre>{{ pages }}</pre> -->
		<client-only placeholder="Loading from session storage…">
			<div v-if=notStarted()>
				<nuxt-content :document="notStartedContent" />
				<NuxtLink to="/review" class="btn btn-primary">Start Your Design Review</NuxtLink>
			</div>
			<div v-else>
				<nuxt-content :document="scorePreface" />
				<section v-for="pillar of results" :key=pillar.name>
					<h2 class="capitalize-case">{{ pillar.name }}</h2>
					<article v-for="delta of deltaSets" :key=delta>
						<review-pillar-results
							v-if=notEmpty(pillar[delta])
							:heading=delta
							:factors=pillar[delta]>
						</review-pillar-results>
					</article>
					<hr>
				</section>
			</div>
		</client-only>
	</div>
</template>

<script>
export default {
	computed: {
		results () {
      return this.$store.getters['decisions/analysis']
		},

		deltaSets () {
			return ['increases', 'decreases', 'neutrals']
		}
	},

  async asyncData({ $content, params }) {
		const notStartedContent = await $content('review/score-not-started').fetch()
		const scorePreface = await $content('review/score-preface').fetch()
		return {
			scorePreface,
			notStartedContent
		}
  },

	methods: {
		notEmpty (arry) {
			return arry.length > 0
		},

		notStarted () {
			for (const pillar in this.results) {
				for (const deltaSet of this.deltaSets) {
					if (this.results[pillar][deltaSet].length > 0) {
						return false
					}
				}
			}
			return true
		}
	}
}
</script>
