<template>
	<article class="review-results-pillar">
		<div>
			<h3 :class=headingClass(heading)>{{ toSingular(heading) }}</h3>
		</div>
		<ul>
			<li v-for="factor of sortDescending(factors)" :key=factor.slug>
				<h4>
					{{ factor.question.shortTitle }} -
					<NuxtLink :to=factor.question.path>{{ factor.title }}</NuxtLink>
					<span class="score-delta">({{ formatDelta(factor.delta) }})</span>
				</h4>
				<p>{{ factor.description }}</p>
			</li>
		</ul>
	</article>
</template>

<script>
export default {
	props: {
		factors: {
			type: Array,
			required: true
		},

		heading: {
			type: String,
			required: true
		}
	},

	methods: {
		sortDescending (factors) {
			factors.sort((f1, f2) => f2.delta - f1.delta)
			return factors
		},

		toSingular (str) {
			str = str.substring(0, str.length - 1)
			return str
			// return str === 'neutral'
			// 	? str
			// 	: str + 'd'
		},

		headingClass (str) {
			return `review-results-heading is-${str}`
		},

		formatDelta (int) {
			return (int > 0)
				? `+${int}`
				: int
		}
	}
}
</script>

<style scoped>
	h3 {
		text-transform: capitalize;
		font-size: 1rem;
	}

	h4 {
		margin-bottom: 0.3em;
	}

	ul {
		margin-top: 0;
	}

	li p {
		margin: 0;
	}

	.score-delta {
		font-weight: 400;
	}
</style>