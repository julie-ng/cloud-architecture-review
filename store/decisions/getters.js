import defaults from '../defaults'

export default {
	score (state) {
		const score = { ...defaults['BASELINE_SCORE'] }

		for (const inputName in state.decisions) {
			const factor = state.decisions[inputName].factor
			score.complexity += factor.points.complexity
			score.operations += factor.points.operations
			score.security += factor.points.security
			score.price += factor.points.price
		}
		return score
	},

	decisions (state) {
		return state.decisions
	},

	answerByQuestion: state => (inputName) => {
		const exists = Object.prototype.hasOwnProperty.call(state.decisions, inputName)
		return exists
			? state.decisions[inputName]
			: 'no-decision'
	}
}
