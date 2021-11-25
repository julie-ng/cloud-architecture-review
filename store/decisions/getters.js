import defaults from '../defaults'

export default {
	score (state) {
		const score = { ...defaults['BASELINE_SCORE'] }

		// shit, need points too.
		for (const k in state.decisions) {
			const factor = state.decisions[k]
			score.complexity += factor.points.complexity
			score.operations += factor.points.operations
			score.security += factor.points.security
			score.price += factor.points.price
		}

		// console.log('decision/getters/score', score)
		return score
	},

	decisions (state) {
		return state.decisions
	},

	answerByQuestion: state => (questionSlug) => {
		const cond = Object.prototype.hasOwnProperty.call(state.decisions, questionSlug)
		return cond
			? state.decisions[questionSlug]
			: `${questionSlug}-undecided`
	}
}
