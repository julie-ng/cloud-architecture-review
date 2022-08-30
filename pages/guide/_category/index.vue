<template>
	<div>
		<h1>Category: {{ content.title }}</h1>
		<nuxt-content :document="content" />
		<p>Todo: list topics</p>
	</div>
</template>

<script>
  export default {
    layout: 'basic',

    async asyncData({ $content, params }) {
      const content = await $content(`guide/${params.category}/index`).fetch()
      return {
        content
      }
    }
  }
</script>