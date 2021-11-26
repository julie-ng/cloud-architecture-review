<template>
	<label :for=factor.slug class="form-control label-factor">
		<input ref="input" type="radio"
			:name=name
			:id=factor.slug
			:key=factor.slug
			:value=factor.slug
			v-model=answer
		>
		<h4>{{ factor.title }}</h4>
		<p>{{ factor.description }}</p>
	</label>
</template>

<script>
  export default {
    props: {
			name: {
				type: String,
				required: true
			},

      factor: {
        type: Object,
        required: true
      }
    },

		computed: {
			answer: {
				get () {
					return this.$store.getters['decisions/answerByQuestion'](this.name).inputValue
				},

				set (value) {
					this.$emit('selected', { factor: this.factor })
				}
			},
		}
  }
	// Example Factor
	// {
	//   "slug": "dr-active-active",
	//   "description": "I always have redudant infrastructure running in production.",
	//   "title": "Active/Active Setup",
	//   "dir": "/guide/requirements/factors",
	//   "path": "/guide/requirements/factors/dr-active-active",
	//   "extension": ".md",
	//   "createdAt": "…",
	//   "updatedAt": "…",
	//   "points": {
	//     "complexity": 20,
	//     "security": 0,
	//     "price": 20,
	//     "operations": 20
	//   }
	// }
</script>
