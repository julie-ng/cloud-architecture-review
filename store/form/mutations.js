import StoreLogger from '~/store/logger.util'

const logger = new StoreLogger()

export default {
	load (state) {
		logger.mutation('form/load')
		state.categories = JSON.parse(sessionStorage.getItem('categories'))
	},

	// triggered server-side (no access to sessionStorage)
	set (state, formCategories) {
		logger.mutation('form/set')
		// console.log(formCategories)
		state.categories = formCategories
	},

	// triggered client-side
	save (state) {
		logger.mutation('form/save', state.categories)
		sessionStorage.setItem('categories', JSON.stringify(state.categories))
	}
}
