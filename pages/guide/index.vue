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
              <div>{{ category.description }}</div>
              <p>
                <li v-for="t of category.topics" :key=t.shortTitle>
                  <NuxtLink :to=t.path>{{ t.shortTitle }}</NuxtLink>
                </li>
              </p>
            </div>
          </div>
        </article>

      </section>
		</main>
		<app-footer/>
	</div>
</template>

<script>
  import ContentConfig from '~/app/content.config'
  import _ from 'lodash'

  export default {
    async asyncData({ $content, app, params, error }) {
      const page = await $content('guide/index').fetch()

      const categories = []
      for (const c of ContentConfig.categories) {
        const category = await $content(`guide/${c}/index`)
          .only([
            'title',
            'shortTitle',
            'description',
            'dir',
            'path'
          ])
          .fetch()

        const topics = await $content(`guide/${c}`, { deep: false })
          .only([
            'title',
            'shortTitle',
            'path'
          ])
          .where({ slug: { $ne: 'index' } })
          .fetch()

        category.topics = topics
        categories.push(category)
      }
      const categoriesGrouped = _.chunk(categories, 2)

      return {
        page,
        categories,
        categoriesGrouped,
      }
    },

    methods: {
      toLowerCase (str) {
        return str.toLowerCase(str)
      }
    }
  }
</script>