<template>
  <div>
    <h1>AKS Factors</h1>
    <ul>
      <li v-for="factor of factors" :key="factor.slug">
        <h2>
          <NuxtLink :to="factor.path">
            {{ factor.title }}
          </NuxtLink>
        </h2>
        <p>{{ factor.description }}</p>
        <p>Category: {{ extractCategory(factor.path) }}</p>
        <pre>
          {{ factor }}
        </pre>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    async asyncData({ $content, params }) {
      const factors = await $content('factors', { deep: true })
        .only(['title', 'description', 'slug', 'path'])
        .sortBy('slug', 'asc')
        .fetch()

      return {
        factors
      }
    },

    methods: {
      extractCategory(path) {
        return path.split('/')[2]
      }
    }
  }
</script>