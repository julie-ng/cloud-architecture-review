import defaults from './defaults'

export default {
  overallScore (state) {
    const score = { ...defaults['BASELINE_SCORE'] }
    state.decisions.forEach((d) => {
      const factor = d.factors.filter(f => f.slug === d.answer)[0]
      score.complexity += factor.stats.complexity
      score.operations += factor.stats.operations
      score.security += factor.stats.security
      score.price += factor.stats.price
    })
    return score
  }
}
