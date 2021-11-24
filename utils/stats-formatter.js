// Because nuxt content cannot process nested YAML front-matter
// we have to manually extract the states to create a `points` object
const STATS = [
  'complexity',
  'security',
  'price',
  'operations'
]

export default {
  /**
   * Lumps stats into `stats` property and deletes,
   * e.g. foo.complexity ==> foo.stats.complexity
   * Needed because nuxt-content does not support nested frontmatter
   *
   * @param factor {Object}
   * @returns {Object}
   */
  groupStats (factor) {
    const stats = {}
    STATS.forEach((s) => {
      stats[s] = factor[s]
      delete factor[s]
    })
    factor.stats = stats
    return factor
  },

  /**
   * Need a unique slug by prefixing with parent question's slug
   *
   * @param question {Object}
   * @param template {Object} Base object content, usu. from factors/undecided.md
   * @return {Object}
   */
  createUndecided (question, template) {
    const copy = { ...template }
    return {
      ...this.groupStats(copy),
      slug: `${question.slug}-undecided`
    }
  }
}
