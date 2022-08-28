<template>
	<div>
    <article class="article-page">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <p class="article-lead">{{ article.description }}</p>
      </header>

      <nuxt-content :document="article" />

      <hr>

      <review-question
				:question=article
			>
			</review-question>

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

    return {
      article
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
