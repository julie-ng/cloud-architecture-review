export default {
  clientInit ({ commit, state }, { req }) {
    console.log('ACTION[form/clientInit]')

    // save categories from /app page
    // TODO/BUG - if user accesses /guide/pages first before hitting /app there will be no navigation
    // At least not in dev. verify what happens if we build page.
    // want to avoid all the asyncData() SSR logic that is in app.
    if (state.categories.length > 0) {
      commit('save')
    }

    if (sessionStorage.getItem('categories')) {
      commit('load')
    }
  }
}
