export default {
  load (state) {
    console.log('MUTATION[form/load]')
    state.categories = JSON.parse(sessionStorage.getItem('categories'))
  },

  // triggered server-side (no access to sessionStorage)
  set (state, formCategories) {
    console.log('MUTATION[form/set]', formCategories)
    state.categories = formCategories
  },

  // triggered client-side
  save (state) {
    console.log('MUTATION[form/save]', state.categories)
    sessionStorage.setItem('categories', JSON.stringify(state.categories))
  }
}
