<template>
	<nuxt-content :document="homepageMd" />
</template>

<script>
  export default {
    layout: 'homepage',

    async asyncData({ $content, params }) {
      const homepageMd = await $content('index').fetch()
      return {
        homepageMd
      }
    }
  }
</script>