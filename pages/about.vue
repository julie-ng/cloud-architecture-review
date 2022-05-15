<template>
	<nuxt-content :document="aboutMd" />
</template>

<script>
  export default {
    layout: 'basic',

    async asyncData({ $content, params }) {
      const aboutMd = await $content('about').fetch()
      return {
        aboutMd
      }
    }
  }
</script>