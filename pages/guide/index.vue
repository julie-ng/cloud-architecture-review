<template>
	<div>
		<app-header/>
    <guide-hero
      :title=content.hero_title
      :subtitle=content.hero_subtitle>
    </guide-hero>

	  <main class="container is-max-widescreen gap-on-mobile mt-4 mb-6">
      <div class="content-single-col">
	      <nuxt-content :document="content" />
      </div>

      <section>
        <article v-for="cat of categories" :key=toLowerCase(cat.title) class="box">
          <h3>
            <NuxtLink :to=cat.dir>{{ cat.title }}</NuxtLink>
          </h3>
          {{ cat.description }}
        </article>
      </section>
		</main>
		<app-footer/>
	</div>
</template>

<script>
  // import ContentLoader from '~/app/form-loader'
  import ContentConfig from '~/app/content.config'
  export default {
    // layout: 'basic',

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