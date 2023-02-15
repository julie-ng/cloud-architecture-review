import StoreLogger from '~/store/logger.util'

const logger = new StoreLogger()

export default {
	load (state) {
		logger.mutation('form/load')
		state.categories = JSON.parse(sessionStorage.getItem('categories'))
	},

	// triggered server-side
	set (state, formCategories) {
		logger.mutation('form/set')
		state.categories = formCategories
	},

	// triggered client-side
	save (state) {
		logger.mutation('form/save', state.categories)
		sessionStorage.setItem('categories', JSON.stringify(state.categories))
	},

	reset (state) {
		logger.mutation('form/reset', 'clearing all categories from session storage')

		state.categories = []
		sessionStorage.removeItem('categories')
	}
}
