export default {
  updateDecision (state, decision) {
    // console.log(`Existing Decisions ${state.decisions.length}`, state.decisions)

    const i = _findDecisionByQuestion(state, decision.question.slug)
    if (i === -1) {
      state.decisions.push(decision)
    } else {
      state.decisions[i].answer = decision.answer
    }
  },

  unsetDecision (state, decision) {
    const i = _findDecisionByQuestion(state, decision.question.slug)
    if (i !== -1) {
      state.decisions.splice(i, 1)
    }
  }
}

const _findDecisionByQuestion = function (state, slug) {
  return state.decisions.findIndex(el => el.question.slug === slug)
}