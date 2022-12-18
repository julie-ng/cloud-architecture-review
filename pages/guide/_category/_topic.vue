<template>
	<div class="layout-article">
		<app-header/>
    <guide-hero
      title="Architecture Guide"
      :small=true>
    </guide-hero>
		<main class="container is-max-widescreen gap-on-mobile">
			<div class="columns is-desktop mt-2">
				<div class="column article-left-nav mr-6 pt-1">
					<app-navigation :current-url=currentUrl />
				</div>
        <div class="column article-page-content pt-4">

          <!-- # Article -->
          <article class="article-page">

            <!-- Breadcrumb -->
            <article-breadcrumb
              :category-url="categoryUrl"
              :category-title="category.title"
              :page-short-title="article.shortTitle">
            </article-breadcrumb>

            <!-- Article Header -->
            <header class="article-header">
              <h1>{{ article.title }}</h1>
              <p class="article-lead">{{ article.description }}</p>
            </header>

            <!-- Article - Category Body -->
            <nuxt-content :document="article" />

            <hr>

            <!-- Article - Factors Bodies -->
            <section v-if="factors.length > 0">
              <h2>Factors</h2>
              <article v-for="f of factors" v-bind:key="f.path">
                <h3>{{ f.title }}</h3>
                <nuxt-content :document="f" />
              </article>
            </section>

            <!-- Itegrate Form Question -->
            <div class="mt-6">
              <!-- Re-use review component for now -->
              <!-- although "Learn more…" link doesn't make sense -->
              <review-question :question=article></review-question>
            </div>

            <!-- <fta-cta /> -->

            <!-- Last Updated -->
            <p class="article-date">Last updated <time :datetime="formatAriaDate(article.updatedAt)">{{ formatDate(article.updatedAt) }}</time></p>

            <hr class="mt-5">

            <!-- Next Previous Nav -->
            <article-next-prev-nav
              :prev-topic="prevTopic"
              :next-topic="nextTopic">
            </article-next-prev-nav>

          </article>
          <!-- # /Article -->
				</div>
				<div class="column article-right-nav pt-6">
					On this page
				</div>
			</div>
		</main>
		<app-footer/>
	</div>
</template>

<script>
import ContentConfig from '~/app/content.config'
import FormLoader from '~/app/form-loader'

export default {
  async asyncData ({ $content, app, params, error }) {
		const loader = new FormLoader({ $content: $content })
		const article = await loader.fetchArticle(params.category, params.topic)

    if (!article) {
      return error({ statusCode: 404, message: 'Article not found' })
    }

    const category = await $content(`guide/${params.category}/index`)
      .only(['title'])
      .fetch()

    const categoryUrl = `/guide/${params.category}`
    const factors = article.factors

    // Article Next/Previous Pages
    const prevTopicSlug = ContentConfig.previousTopic(params.category, params.topic)
    const nextTopicSlug = ContentConfig.nextTopic(params.category, params.topic)

    const prevTopic = prevTopicSlug
      ? await $content(`guide/${params.category}/${prevTopicSlug}`)
          .only(['shortTitle', 'path'])
          .fetch()
      : {}

    const nextTopic = nextTopicSlug
      ? await $content(`guide/${params.category}/${nextTopicSlug}`)
          .only(['shortTitle', 'path'])
          .fetch()
      : {}

    return {
      article,
      factors,
      category,
      categoryUrl,
      prevTopic,
      nextTopic
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
