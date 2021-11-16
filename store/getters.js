import defaults from './defaults'

export default {
  overallScore (state) {
    const score = { ...defaults['BASELINE_SCORE'] }
    state.decisions.forEach((d) => {
      const factor = d.answer
      score.complexity += factor.stats.complexity
      score.operations += factor.stats.operations
      score.security += factor.stats.security
      score.price += factor.stats.price
    })
    return score
  }
}
