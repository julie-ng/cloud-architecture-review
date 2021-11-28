<template>
	<nuxt-content :document="homepage" />
</template>

<script>
  export default {
    layout: 'basic', // <-- why we can't use _.vue

    async asyncData({ $content, params }) {
      const homepage = await $content('index').fetch()
      return {
        homepage
      }
    }
  }
</script>