<template>
	<nuxt-content :document="content" />
</template>
=
<script>
  export default {
    layout: 'basic',

    async asyncData({ $content, params }) {
      const content = await $content('guide/index').fetch()
      return {
        content
      }
    }
  }
</script>