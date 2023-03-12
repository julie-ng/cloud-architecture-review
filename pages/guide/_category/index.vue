<template>
	<div>
    <app-header/>

    <guide-hero
      :title=content.title
      :subtitle=content.description
      :color="'is-link'"
    >
    </guide-hero>

	  <main class="container is-max-widescreen gap-on-mobile mt-4 mb-6">

      <nav class="breadcrumb" aria-label="breadcrumbs">
        <ul>
          <li><NuxtLink to="/guide">Architecture Guide</NuxtLink></li>
          <li class="is-active"><a href="#" aria-current="page">{{ content.title }}</a></li>
        </ul>
      </nav>

      <div class="content-single-col">
        <!-- <h1>{{ content.title }}</h1>
        <div class="lead">
          {{ content.description }}
        </div> -->
        <nuxt-content :document="content" />
      </div>

      <section>
        <div v-for="group, i of topicGrouped" :key=i>
          <div class="tile is-ancestor">
            <div v-for="topic, index of group" :key=topic.title class="tile is-parent is-4">
              <div class="tile is-child box">
                <h3><NuxtLink :to=topic.path>{{ topic.shortTitle }}</NuxtLink></h3>
                <p>{{ topic.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    	</main>
		<app-footer/>
	</div>
</template>

<script>
  import ContentConfig from '~/app/content.config'
  import _ from 'lodash'

  export default {
    async asyncData({ $content, params }) {
      const content = await $content(`guide/${params.category}/index`).fetch()

      const topics = await $content(`guide/${params.category}`, { deep: false })
        .without(['body'])
        .where({ slug: { $ne: 'index' } })
        .fetch()
      const topicGrouped = _.chunk(topics, 3)

      return {
        content,
        topics,
        topicGrouped
      }
    }
  }
</script>