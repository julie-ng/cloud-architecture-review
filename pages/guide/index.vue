<template>
  <div>
	  <nuxt-content :document="content" />
    <h1>Categories</h1>
    <ul>
      <li v-for="cat of categories" :key=toLowerCase(cat.title)>
        <NuxtLink :to=cat.dir>{{ cat.title }}</NuxtLink>
      </li>
    </ul>
    <pre>{{ categories }}</pre>
  </div>
</template>

<script>
  import ContentLoader from '~/app/form-loader'
  import ContentConfig from '~/app/content.config'
  export default {
    layout: 'basic',

    async asyncData({ $content, params }) {
      const content = await $content('guide/index').fetch()
			// const isLoaded = store.getters['form/isLoaded']
			// if (!isLoaded) {
			// 	const loader = new ContentLoader({ $content: $content })
			// 	const data = await loader.loadAll()
			// 	store.commit('form/set', data)
			// }
      const categories = []
      ContentConfig.categories.forEach(async function (c) {
        const category = await $content(`guide/${c}/index`)
          .without(['body'])
          .fetch()
        categories.push(category)
      })

      return {
        content,
        categories
      }
    },

    methods: {
      toLowerCase (str) {
        return str.toLowerCase(str)
      }
    }
  }
</script>