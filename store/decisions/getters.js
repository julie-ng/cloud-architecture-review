/* eslint-disable object-shorthand */
import defaults from '../defaults'

const CATEGORIES = [
	'complexity',
	'operations',
	'security',
	'cost'
]

export default {
	scores (state) {
		const score = { ...defaults['BASELINE_SCORE'] }

		for (const inputName in state.decisions) {
			const factor = state.decisions[inputName].factor
			score.complexity += factor.points.complexity
			score.operations += factor.points.operations
			score.security += factor.points.security
			score.cost += factor.points.cost
		}
		return score
	},

	analysis (state) {
		const results = {}
		CATEGORIES.forEach((c) => {
			results[c] = {
				name: c,
				increases: [],
				decreases: [],
				neutrals: []
			}
		})

		for (const inputName in state.decisions) {
			const question = state.decisions[inputName].question
			const factor = state.decisions[inputName].factor
			for (const score in factor.points) {
				const delta = factor.points[score]
				const excerpt = {
					title: factor.title,
					description: factor.description,
					slug: factor.slug,
					path: factor.path,
					delta: delta,
					question: question
					// full: factor
				}

				if (delta > 0) {
					results[score].increases.push(excerpt)
				} else if (delta < 0) {
					results[score].decreases.push(excerpt)
				} else {
					results[score].neutrals.push(excerpt)
				}
			}
		}

		return results
	},

	answerByQuestion: state => (key) => {
		const exists = Object.prototype.hasOwnProperty.call(state.decisions, key)
		return exists
			? state.decisions[key].value
			: 'no-decision'
	}
}
