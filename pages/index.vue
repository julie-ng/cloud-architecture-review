<template>
	<div class="app-container">
		<app-header/>

		<div class="wrapper">
			 <nuxt-content :document="homepage" />
		</div>

		<app-footer/>
	</div>
</template>


<script>
  export default {
    async asyncData({ $content, params }) {
      const homepage = await $content('home').fetch()
      return {
        homepage
      }
    }
  }
</script>