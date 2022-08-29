<template>
	<article v-bind:class="elClass">
		<label :for=factor.slug class="form-control label-factor">
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
	</article>
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
					return this.$store.getters['decisions/answerByQuestion'](this.name)
				},

				set (value) {
					this.$emit('selected', { factor: this.factor })
				}
			},

 			elClass: function () {
				return {
					'factor-container': true,
					'is-selected': this.answer === this.factor.inputValue
				}
			}
		},

		// manually highligh selected element because SSR won't have populated it
		mounted () {
			if (this.factor.slug === this.answer) {
				const selector = '#' + this.factor.slug
				document.querySelector(selector).parentElement.parentElement.classList.add('is-selected')
			}
		}
  }
</script>
