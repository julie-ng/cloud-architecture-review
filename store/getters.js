import defaults from './defaults'

export default {
  overallScore (state) {
    const score = { ...defaults['BASELINE_SCORE'] }
    console.log('overallScore()', state.decisions)

    // shit, need stats too.
    for (const k in state.decisions) {
      const factor = state.decisions[k]
      score.complexity += factor.stats.complexity
      score.operations += factor.stats.operations
      score.security += factor.stats.security
      score.price += factor.stats.price
    }
    // state.decisions.forEach((d) => {
    // })
    return score
  },

  form (state) {
    return state.form
  },

  decisions (state) {
    return state.decisions
  },

  answerByQuestion: state => (questionSlug) => {
    const cond = Object.prototype.hasOwnProperty.call(state.decisions, questionSlug)
    console.log(`Does ${questionSlug} exist?`, cond)
    return cond
      ? state.decisions[questionSlug]
      : `${questionSlug}-undecided`
  }
}
