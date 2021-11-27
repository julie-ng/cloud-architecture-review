<template>
  <div>
    <h1 v-if="error.statusCode === 404">Oops - page not found</h1>
    <h1 v-else>An error occurred</h1>
    <NuxtLink class="btn btn-primary" to="/">Go to Homepage &rarr;</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'basic'
  }
</script>