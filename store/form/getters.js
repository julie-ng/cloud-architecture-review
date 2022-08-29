export default {
	categories (state) {
		return state.categories
	},

	isLoaded (state) {
		return state.categories.length > 0
	}
}
