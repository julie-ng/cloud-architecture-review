<template>
	<div>
    <article class="article-page">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <!-- <p class="article-date"><time :datetime="formatAriaDate(article.createdAt)">{{ formatDate(article.createdAt) }}</time></p> -->
      </header>
      <nuxt-content :document="article" />

      <section v-if="factors.length > 0">
        <h2>Factors</h2>
        <article v-for="f of factors" v-bind:key="f.path">
          <h3>{{ f.title }}</h3>
          <nuxt-content :document="f" />
        </article>
      </section>

      <!-- <pre>{{ article }}</pre> -->
      <hr>
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
    const path = `/guide/${params.category}/${params.question_slug}`
    const [article] = await $content({ deep: true }).where({ path }).fetch()

    let content = { article } // default content

    if (!article) {
      return error({ statusCode: 404, message: 'Article not found' })
    }
    else if (article.hasOwnProperty('options') && article.options.length > 0) {
      const factors = await _fetchFactorContent($content, article.dir, article.options)
      content = { article, factors } // append factors
    }

    return content
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
      .without(['toc'])
      .fetch()
    content.push(body)
  }
  return content
}
</script>

