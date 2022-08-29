<template>
	<div>
    <article class="article-page">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <p class="article-lead">{{ article.description }}</p>
      </header>

      <nuxt-content :document="article" />

      <hr>

      <section v-if="factors.length > 0">
        <h2>Factors</h2>
        <p class="grey-text">(TODO - add radio buttons here for user to toggle and update score.)</p>

        <article v-for="f of factors" v-bind:key="f.path">
          <h3>{{ f.title }}</h3>
          <nuxt-content :document="f" />
        </article>
      </section>

      <hr>

      <review-question :question=article></review-question>

      <fta-cta />

      <p class="article-date">Last updated <time :datetime="formatAriaDate(article.updatedAt)">{{ formatDate(article.updatedAt) }}</time></p>
    </article>
	</div>
</template>

<script>
import FormLoader from '~/app/form-loader'

export default {
  layout: 'app',

  async asyncData ({ $content, app, params, error }) {
		const loader = new FormLoader({ $content: $content })
		const article = await loader.fetchArticle(params.category, params.question)

    if (!article) {
      return error({ statusCode: 404, message: 'Article not found' })
    }

    const factors = article.factors

    return {
      article,
      factors
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
</script>
