<template>
	<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><NuxtLink to="/guide">Architecture Guide</NuxtLink></li>
        <li><NuxtLink :to=categoryUrl>{{ category.title }}</NuxtLink></li>
        <li class="is-active"><a href="#" aria-current="page">{{ article.shortTitle }}</a></li>
      </ul>
    </nav>
    <article class="article-page">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <p class="article-lead">{{ article.description }}</p>
      </header>

      <nuxt-content :document="article" />

      <hr>

      <section v-if="factors.length > 0">
        <h2>Factors</h2>
        <p class="grey-text">(TODO - add radio buttons here for user to toggle and update score.)</p>

        <article v-for="f of factors" v-bind:key="f.path">
          <h3>{{ f.title }}</h3>
          <nuxt-content :document="f" />
        </article>
      </section>

      <div class="mt-6">
        <review-question :question=article></review-question>
      </div>



      <!-- <fta-cta /> -->

      <p class="article-date">Last updated <time :datetime="formatAriaDate(article.updatedAt)">{{ formatDate(article.updatedAt) }}</time></p>
      <hr class="mt-5">
      <div class="article-next-prev mb-5 pb-3 columns">
        <div class="column">
          <div v-if=prevTopic>
            <NuxtLink class="button is-link is-light" :to=prevTopic.path>
              <span>Previous</span>
              <span>&larr; {{ prevTopic.shortTitle }}</span>
            </NuxtLink>
          </div>
        </div>
        <div class="column">
          <div v-if=nextTopic>
            <NuxtLink class="button is-link is-light" :to=nextTopic.path>
              <span>Next</span>
              <span>{{ nextTopic.shortTitle }} &rarr;</span>
            </NuxtLink>
          </div>
        </div>
      </div>







    </article>
	</div>
</template>

<script>
import ContentConfig from '~/app/content.config'
import FormLoader from '~/app/form-loader'

export default {
  layout: 'article',

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

    // testing next/prev
    const prevTopicSlug = ContentConfig.previousTopic(params.category, params.topic)
    const nextTopicSlug = ContentConfig.nextTopic(params.category, params.topic)

    console.log('prevTopic', prevTopicSlug)
    console.log('nextTopic', nextTopicSlug)


    const prevTopic = prevTopicSlug
      ? await $content(`guide/${params.category}/${prevTopicSlug}`)
          .only(['shortTitle'])
          .fetch()
      : null

    const nextTopic = nextTopicSlug
      ? await $content(`guide/${params.category}/${nextTopicSlug}`)
          .only(['shortTitle'])
          .fetch()
      : null


    // if (nextTopicSlug) {
    //   console.log('got next topic')
    //   const nextTopic = await $content(`guide/${params.category}/${nextTopicSlug}`)
    //     .only(['shortTitle'])
    //     .fetch()
    //   console.log(nextTopic)
    // }

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
