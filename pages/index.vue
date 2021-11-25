<template>
	<nuxt-content :document="homepage" />
</template>


<script>
  export default {
    layout: 'basic',

    async asyncData({ $content, params }) {
      const homepage = await $content('home').fetch()
      return {
        homepage
      }
    }
  }
</script>