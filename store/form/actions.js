import ContentLoader from '~/architect/content'
import StoreLogger from '~/store/logger.util'

const logger = new StoreLogger()

export default {
	async clientInit ({ commit, state }, { req }) {
		const isEmptyState = (state.categories.length === 0)
		const sessionCached = sessionStorage.getItem('categories')
		const isCachedOnClient = sessionCached !== null && sessionCached !== ''

		if (isCachedOnClient) {
			logger.action('form/clientInit', 'loading from sessionStorage…')
			commit('load')

		} else if (isEmptyState) {
			logger.action('form/clientInit', 'loading from $content…')
			commit('load')
			const loader = new ContentLoader({ $content: this.$content })
			const data = await loader.load()

			commit('set', data)
			commit('save')
		} else {
			logger.action('form/clientInit', 'already have categories')
		}
	}
}
