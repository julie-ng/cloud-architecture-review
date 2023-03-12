<template>
	<div>
		<app-header/>
    <guide-hero
      :color="'is-link'"
      :title=page.hero_title
      :subtitle=page.hero_subtitle>
    </guide-hero>

	  <main class="container is-max-widescreen gap-on-mobile mt-4 mb-6">
      <div class="content-single-col">
	      <nuxt-content :document="page" />
      </div>

      <section>
        <article v-for="group, i of categoriesGrouped" :key=i class="tile is-ancestor">
          <div v-for="category of group" :key=toLowerCase(category.title) class="tile is-parent is-6">
            <div class="tile is-child box">
              <h3 class="mt-3 mb-2">
                <NuxtLink :to=category.dir>{{ category.title }}</NuxtLink>
              </h3>
              {{ category.description }}
            </div>
          </div>
        </article>
      </section>
		</main>

		<app-footer/>
	</div>
</template>

<script>
  import _ from 'lodash'

  export default {
    async asyncData({ $content, params }) {
			// const isLoaded = store.getters['form/isLoaded']
			// if (!isLoaded) {
			// 	const loader = new ContentLoader({ $content: $content })
			// 	const data = await loader.loadAll()
			// 	store.commit('form/set', data)
			// }

      const page = await $content('guide/index').fetch()
      const categories = await $content(`guide`, { deep: true })
        .without(['body'])
        .where({
          slug: { $eq: 'index' },
          path: { $ne: '/guide/index' }
        })
        .sortBy('category_order', 'asc')
        .fetch()
      const categoriesGrouped = _.chunk(categories, 2)

      return {
        page,
        categories,
        categoriesGrouped
      }
    },

    methods: {
      toLowerCase (str) {
        return str.toLowerCase(str)
      }
    }
  }
</script>