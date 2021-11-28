<template>
	<label :for=factor.slug class="form-control label-factor">
		<!-- <pre>{{ factor }}</pre> -->
		<input ref="input" type="radio"
			:name=name
			:id=factor.inputValue
			:key=factor.inputValue
			:value=factor.inputValue
			v-model=answer
		>
		<h4>{{ factor.title }}</h4>
		<p>{{ factor.description }}</p>
	</label>
</template>

<script>
	const FactorSchema = require('../../schemas/factor')

  export default {
    props: {
			name: {
				type: String,
				required: true
			},

      factor: { // already normalized
        type: Object,
        required: true
      }
    },

		computed: {
			answer: {
				get () {
					return this.$store.getters['decisions/answerByQuestion'](this.name)
				},

				set (value) {
					this.$emit('selected', { factor: this.factor })
				}
			},
		}
  }
</script>
