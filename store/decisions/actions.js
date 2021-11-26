import StoreLogger from '~/store/logger.util'

const logger = new StoreLogger()

export default {

	/**
   * After page loads, check if there are existing decisions
   * in browser sessionStorage. If so, dispatch LOAD_DECSISIONs.
   */
	clientInit ({ commit }, { req }) {
		logger.action('decisions/clientInit')

		if (sessionStorage.getItem('decisions')) {
			commit('load')
		}
	}
}
