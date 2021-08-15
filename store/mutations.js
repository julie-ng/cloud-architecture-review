export default {
  updateDecision (state, factor) {
    if (state.decisions.indexOf(factor.question) == -1) {
      state.decisions.push(factor.question)
    }

    factor.question.answer = factor.answer.id
  },

	unsetDecision (state, factor) {
		const q = factor.question
		state.decisions.splice(state.decisions.indexOf(q), 1)
	}
}