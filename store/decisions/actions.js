export default {

  /**
   * After page loads, check if there are existing decisions
   * in browser sessionStorage. If so, dispatch LOAD_DECSISIONs.
   */
  clientInit ({ commit }, { req }) {
    console.log('ACTION[decisions/clientInit]')

    if (sessionStorage.getItem('decisions')) {
      commit('load')
    }
  }
}
