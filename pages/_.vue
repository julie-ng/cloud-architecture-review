<template>
	<div class="app-container">
		<app-header/>
    <main class="app-main wrapper">
			<div class="app-body">
        <article>
          <header class="article-header">
            <h1>{{ article.title }}</h1>
            <p class="article-date"><time :datetime="formatAriaDate(article.createdAt)">{{ formatDate(article.createdAt) }}</time></p>
          </header>
          <nuxt-content :document="article" />
          <hr>
          <p class="article-date">Last updated <time :datetime="formatAriaDate(article.updatedAt)">{{ formatDate(article.updatedAt) }}</time></p>
        </article>
  		</div>
    </main>
		<app-footer/>
	</div>
</template>

<script>
export default {
  async asyncData ({ $content, app, params, error }) {
    const path = `/${params.pathMatch || 'index'}`
    const [article] = await $content({ deep: true }).where({ path }).fetch()

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

