export default {
  /**
   * Load existing decision data from browser's sessionStorage
   * @param {Array|Observable?} state
   */
  load (state) {
    console.log('MUTATION[decisions/load]')
    state.decisions = JSON.parse(sessionStorage.getItem('decisions'))
  },

  /**
   * Sync decision to session storage
   *
   * @param {Array|Observable?} state
   * @param {Object} decision
   * @param {Object} decision.answer
   * @param {Object} decision.question
   */
  update (state, decision) {
    console.log('MUTATION[decisions/update]: sync state with sessionStorage')
    // console.log(decision)
    const q = decision.question
    const a = decision.answer
    const cat = decision.category

    state.decisions = {
      ...state.decisions,
      [`${cat}-${q.slug}`]: {
        factor_id: a.factor_id,
        stats: a.stats
      }
    }

    sessionStorage.setItem('decisions', JSON.stringify(state.decisions))
  },

  /**
   * Remove decision from state
   * re-sync with session storage
   *
   * @param {Array|Observable?} state
   * @param {Object} decision
   * @param {Object} decision.answer
   * @param {Object} decision.question
   */
  remove (state, decision) {
    console.log('MUTATION[decisions/remove]: sync state with sessionStorage')

    const q = decision.question
    const cat = decision.category
    const copy = { ...state.decisions }
    delete copy[`${cat}-${q.slug}`]
    state.decisions = copy // re-assign for re-activity

    sessionStorage.setItem('decisions', JSON.stringify(state.decisions))
  },

  /**
   * Clear session storage and empties decisions.
   *
   * @param {Array|Observable?} state
   */
  reset (state) {
    console.log('MUTATION[decisions/reset]: clearing session storage')
    sessionStorage.clear()
    state.decisions = {}
  }
}
