import StoreLogger from '~/store/logger.util'

const logger = new StoreLogger()

export default {

	clientInit ({ commit }, { req }) {
		logger.action('decisions/clientInit')

		if (sessionStorage.getItem('decisions')) {
			commit('load')
		}
	}
}
