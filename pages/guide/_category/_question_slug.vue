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

      <!-- <pre>{{ factors }}</pre> -->
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
    const path = `/questions/${params.category}/${params.question_slug}`
    const [article] = await $content({ deep: true }).where({ path }).fetch()

    // console.log(article)
    let content = { article } // default content

    if (!article) {
      return error({ statusCode: 404, message: 'Article not found' })
    }
    else if (article.hasOwnProperty('factors') && article.factors.length > 0) {
      let factors = []
      for (const f of article.factors) {
        let factor = await $content(`/factors/${f.path}`)
          .without(['toc'])
          .fetch()
        factors.push(factor)
      }

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
</script>


<style>
.article-header {
  margin: 1em 0 2em;
}

.article-date {
  color: #999;
  margin: 0;
}

hr {
  border: none;
  border-top: 1px solid #ddd;
}
</style>

