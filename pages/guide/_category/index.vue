<template>
	<div>
    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li><NuxtLink to="/guide">Architecture Guide</NuxtLink></li>
        <li class="is-active"><a href="#" aria-current="page">{{ content.title }}</a></li>
      </ul>
    </nav>
    <p>

      </p>
		<h1>{{ content.title }}</h1>
		<nuxt-content :document="content" />

    <section>
      <article v-for="topic of topics" :key=topic.title class="box">
        <h3>
         <NuxtLink :to=topic.path>{{ topic.shortTitle }}</NuxtLink>
        </h3>
        {{ topic.description }}
      </article>
    </section>

    <hr>

    <pre>{{ topics }}</pre>
	</div>
</template>

<script>
  import ContentConfig from '~/app/content.config'
  export default {
    layout: 'basic',

    async asyncData({ $content, params }) {
      const content = await $content(`guide/${params.category}/index`).fetch()

      const topics = await $content(`guide/${params.category}`, { deep: false })
        .without(['body'])
        .where({ slug: { $ne: 'index' } })
        .fetch()


      return {
        content,
        topics
      }
    }
  }
</script>