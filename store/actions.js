const config = require('./../app.config')

export default {

  /**
   * After page loads, check if there are existing decisions
   * in browser sessionStorage. If so, dispatch LOAD_DECSISIONs.
   */
  nuxtClientInit ({ commit }, { req }) {
    console.log('[nuxtClientInit] Hello World')

    if (sessionStorage.getItem(config.storageKey)) {
      commit('LOAD_DECISIONS')
    }
  }
}
