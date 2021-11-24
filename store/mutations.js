const config = require('./../app.config')

export default {
  /**
   * Load existing decision data from browser's sessionStorage
   * @param {Array|Observable?} state
   */
  LOAD_DECISIONS (state) {
    console.log('[LOAD_DECISIONS]')
    state.decisions = JSON.parse(sessionStorage.getItem(config.storageKey))
  },

  /**
   * Populate the state with the form data
   *
   * @param {Array|Observable?} state
   * @param {Array} formCategories
   */
  SET_FORM (state, formCategories) {
    console.log('[SET_FORM]', formCategories)
    state.form = formCategories
  },

  /**
   * Sync decision to session storage
   *
   * @param {Array|Observable?} state
   * @param {Object} decision
   * @param {Object} decision.answer
   * @param {Object} decision.question
   */
  UPDATE_DECISION (state, decision) {
    console.log('[UPDATE_DECISION]: sync state with sessionStorage')
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

    sessionStorage.setItem(config.storageKey, JSON.stringify(state.decisions))
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
  REMOVE_DECISION (state, decision) {
    console.log('[REMOVE_DECISION]: sync state with sessionStorage')

    const q = decision.question
    const cat = decision.category
    const copy = { ...state.decisions }
    delete copy[`${cat}-${q.slug}`]
    state.decisions = copy // re-assign for re-activity

    sessionStorage.setItem(config.storageKey, JSON.stringify(state.decisions))
  },

  /**
   * Clear session storage and empties decisions.
   *
   * @param {Array|Observable?} state
   */
  RESET_DATA (state) {
    console.log('[RESET_DATA]: clearing session storage')
    sessionStorage.clear()
    state.decisions = {}
  }
}
