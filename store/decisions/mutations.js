import StoreLogger from '~/store/logger.util'

const logger = new StoreLogger()

export default {
	/**
   * Load existing decision data from browser's sessionStorage
   * @param {*} state
   */
	load (state) {
		logger.mutation('decisions/load')
		state.decisions = JSON.parse(sessionStorage.getItem('decisions'))
	},

	/**
   * Sync decision to session storage
   *
   * @param {*} state
   * @param {Object} decision
   * @param {Object} decision.selected
   * @param {String} decision.inputName
	 * @param {String} decision.inputValue
   */
	update (state, decision) {
		logger.mutation('decisions/update', `update ${decision.inputName} sync state with sessionStorage`)

		state.decisions = {
			...state.decisions,
			[decision.key]: decision
		}

		sessionStorage.setItem('decisions', JSON.stringify(state.decisions))
	},

	/**
   * Remove decision from state
   * re-sync with session storage
   *
   * @param {*} state
   * @param {String} key maps to <input> name for question
   */
	remove (state, key) {
		logger.mutation('decisions/remove', `delete ${key} and sync with session storage`)

		const copy = { ...state.decisions }
		delete copy[key]
		state.decisions = copy // re-assign for re-activity

		sessionStorage.setItem('decisions', JSON.stringify(state.decisions))
	},

	/**
   * Clear session storage and empties decisions.
   *
   * @param {*} state
   */
	reset (state) {
		logger.mutation('decisions/reset', 'clearing decisions from session storage')

		state.decisions = {}
		sessionStorage.removeItem('decisions')
	}
}
