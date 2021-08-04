<template>
  <article>
		<!-- markdown -->
    <nuxt-content :document="article" />
		<p>{{ article.createdAt }}</p>
		<p>{{ formatDate(article.updatedAt) }}</p>

    <prev-next :prev="prev" :next="next" />
  </article>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      // 'articles' is name of folder in 'content/' directory
      const article = await $content('articles', params.slug).fetch()

      const [prev, next] = await $content('articles')
        .only(['title', 'slug'])
        .sortBy('createdAt', 'asc')
        .surround(params.slug)
        .fetch()

      return {
        article,
        prev,
        next
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