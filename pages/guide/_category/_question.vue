<template>
	<div>
    <article class="article-page">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
      </header>

      <nuxt-content :document="article" />

      <section class="article-factors" v-if="factors.length > 0">
        <h2>Factors</h2>
        <p class="grey-text">(TODO - add radio buttons here for user to toggle and update score.)</p>

        <article v-for="f of factors" v-bind:key="f.path">
          <h3>{{ f.title }}</h3>
          <nuxt-content :document="f" />
        </article>
      </section>

      <!-- <pre>{{ article }}</pre> -->

      <p class="article-date">Last updated <time :datetime="formatAriaDate(article.updatedAt)">{{ formatDate(article.updatedAt) }}</time></p>
    </article>
	</div>
</template>

<script>
export default {
	data () {
		return {
			factors: []
		}
	},

  async asyncData ({ $content, app, params, error }) {
    const path = `/guide/${params.category}/${params.question}`
    const [article] = await $content({ deep: true })
      .where({ path })
      .fetch()

    if (!article) {
      return error({ statusCode: 404, message: 'Article not found' })
    }
    else if (article.hasOwnProperty('factors') && article.factors.length > 0) {
      const factors = await _fetchFactorContent($content, article.dir, article.factors)
      return {
        article,
        factors
      }
    }
  },

	methods: {
		formatDate(date) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Date(date).toLocaleDateString('en', options)
		},

    formatAriaDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    }
	}
}

async function _fetchFactorContent ($content, basePath, factors) {
  const content = []
  for (const f of factors) {
    const body = await $content(`${basePath}/factors/${f.slug}`)
      .without(['toc', 'extension', 'createdAt', 'updatedAt'])
      .fetch()
    content.push(body)
  }
  return content
}
</script>
