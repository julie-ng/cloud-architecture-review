export const state = () => ({
	// TODO: define opinionated default cluster baseline
  score: {
		complexity: 30,
		operations: 30,
		security: 30,
		price: 30
	}
})

export const mutations = {
	update(state, factor) {
		state.score.complexity += factor.complexity || 0
		state.score.operations += factor.operations || 0
		state.score.security   += factor.security || 0
		state.score.price      += factor.price || 0
	}

  // add(state, text) {
  //   state.list.push({
  //     text,
  //     done: false
  //   })
  // },

  // remove(state, { todo }) {
  //   state.list.splice(state.list.indexOf(todo), 1)
  // },

  // toggle(state, todo) {
  //   todo.done = !todo.done
  // }
}