export default {
	test (state, factor) {
		state.score.complexity += factor.complexity || 0
		state.score.operations += factor.operations || 0
		state.score.security   += factor.security || 0
		state.score.price      += factor.price || 0
	},

  add (state, question) {
    state.decisions.push(question)
  },

  update (state, selected) {
    if (state.decisions.indexOf(selected.question) == -1) {
      console.log(`[STORE] Question not found`)
      state.decisions.push(selected.question)
    } else {
      console.log(`[STORE] Question found`)
    }

    selected.question.answer = selected.answer.id
    console.log(`==== ${selected.question.answer}`)
  },

  remove (state, { question }) {
    state.decisions.splice(state.decisions.indexOf(question), 1)
  }

  // toggle(state, todo) {
  //   todo.done = !todo.done
  // }
}