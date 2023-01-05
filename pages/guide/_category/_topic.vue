<template>
	<div class="layout-article">
		<app-header/>
    <guide-hero
      title="Architecture Guide"
      :small=true>
    </guide-hero>
		<main class="container is-max-widescreen gap-on-mobile">
			<div class="columns is-desktop mt-0">
				<div class="column article-left-nav mr-6 pt-1">
          <guide-side-navigation :categories=sidenav />
				</div>
        <div class="column article-page-content pt-4">

          <!-- # Article -->
          <article class="article-page">

            <!-- Breadcrumb -->
            <article-breadcrumb
              :category=category
              :page-short-title="article.shortTitle">
            </article-breadcrumb>

            <!-- Article Header -->
            <header class="article-header">
              <h1>{{ article.title }}</h1>
              <p class="article-lead">{{ article.description }}</p>
            </header>

            <!-- Article - Category Body -->
            <nuxt-content :document="article" />

            <!-- Itegrate Form Question -->
            <article-question class="mt-6"
              v-if="factors.length > 0"
              :question=article
              :factors=factors
            >
            </article-question>

            <!-- Article - Factors Content -->
            <section v-if="factors.length > 0">
              <h1>{{ article.factors_heading || 'Factors' }}</h1> <!-- TODO/Bug: this h1 not included in aggregate TOC yet -->
              <article v-for="f of factors" v-bind:key="f.path">
                <nuxt-content :document="f" />
              </article>
            </section>

            <!-- <fta-cta /> -->

            <hr class="mt-5">

            <!-- Next Previous Nav -->
            <article-next-prev-nav
              :prev-topic="prev"
              :next-topic="next">
            </article-next-prev-nav>

          </article>
          <!-- # /Article -->
				</div>
				<div class="column article-right-nav pt-6">
          <h4 class="my-0">Last updated</h4>
          <p class="article-date mt-0 mb-4"><time :datetime="formatAriaDate(article.updatedAt)">{{ formatDate(article.updatedAt) }}</time></p>

					<h4 class="mt-1 mb-1">Contents</h4>
          <ul class="mt-1 article-toc-nav">
            <li v-for="link of aggregateToc"
              :key="link.id"
              :class="{ 'toc-level-2': link.depth === 2, 'toc-level-3': link.depth === 3 }">
              <NuxtLink :to="`#${link.id}`">{{ fixTocTitle(link.text) }}</NuxtLink>
            </li>
          </ul>
				</div>
			</div>
		</main>
		<app-footer/>
	</div>
</template>

<script>
import ContentConfig from '~/app/content.config'

export default {
  async asyncData ({ $content, app, params, error }) {

    /**
     * Sidenav
     */
    const sidenav = []
    ContentConfig.categories.forEach(async function (c) {
      const category = await $content(`guide/${c}/index`)
        .only(['title', 'shortTitle'])
        .fetch()

      // Append subtopics
      const topics = await $content(`guide/${c}`, { deep: false })
        .only(['title','shortTitle', 'description'])
        .where({ slug: { $ne: 'index' } })
        .fetch()
      category.topics = topics
      sidenav.push(category)
    })

    /**
     * Article
     */
    const article = await $content(`guide/${params.category}/${params.topic}`).fetch()
    let aggregateToc = article.toc
    const factors = []

    if (!article) {
      return error({ statusCode: 404, message: 'Article not found' })
    }

    if (article.factors) {
      for await (const f of article.factors) {
        const factor = await $content(`guide/${params.category}/${f.slug}`).fetch()
        factors.push(factor)
        console.log('got factor toc?', factor.toc)
        aggregateToc = aggregateToc.concat(factor.toc)
      }
    }

    /**
     * Category Title for Breadcrumb
     */
    const category = await $content(`guide/${params.category}/index`)
      .only(['title', 'shortTitle'])
      .fetch()

    /**
     * Article Next/Previous Pages
     */
    const [prev, next] = await $content(`guide/${params.category}`)
      .where({ slug: { $ne: 'index' } })
      .only(['shortTitle', 'path'])
      .sortBy('date')
      .surround(params.topic)
      .fetch()

    return {
      article,
      category,
      sidenav,
      next,
      prev,
      factors,
      aggregateToc
    }
  },

	methods: {
		formatDate(date) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' }
			return new Date(date).toLocaleDateString('en', options)
		},

    formatAriaDate(date) {
      return new Date(date).toISOString().slice(0, 10);
    },

    // seems to be a weird bug, not in nuxt docs
    fixTocTitle (title) {
      return title[0] === '#'
        ? title.slice(1)
        : title
    }
	}
}
</script>
