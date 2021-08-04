<template>
  <article>
		<!-- markdown -->
		<h3>Factors</h3>
		<h1>{{ article.title }}</h1>
    <nuxt-content :document="article" />
		<p>{{ article.createdAt }}</p>
		<p>{{ formatDate(article.updatedAt) }}</p>

    <prev-next :prev="prev" :next="next" />
  </article>
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
		}
	}
}
</script>