<template>
		<label :for=factor.slug :class=getLabelClass()>
			<input ref="input" type="radio"
				:name=inputName()
				:id=factor.slug
				:key=factor.slug
				:value=factor.slug
				v-model=answer
			>
			<div v-if=isUndecided()>
				<h4>Reset</h4>
			</div>
			<div v-else>
				<h4>{{ factor.title }}</h4>
				<p>{{ factor.description }}</p>
			</div>
		</label>
</template>

<script>
  export default {
    props: {
      factor: {
        type: Object,
        required: true
      },
			question: {
				type: Object,
				required: true
			},
			category: {
				type: String,
				required: true
			},
			stats: {
				type: Object,
				required: true
			}
    },

		computed: {
			answer: {
				get () {
					return this.$store.getters.answerByQuestion(`${this.category}-${this.question.slug}`).factor_id
				},

				set (value) {
					const data = {
						factor_id: value,
						stats: this.factor.stats
					}
				console.log(`factor(${this.factor.slug}): selected`)
				this.$emit('selected', { selected: data })
				}
			},
		},

		methods: {
			inputName: function () {
				return `${this.category}-${this.question.slug}`
			},

			isUndecided: function () {
				const parts = this.factor.slug.split('-')
				return parts[parts.length - 1] === 'undecided'
			},

			getLabelClass: function () {
				return this.isUndecided()
					? 'label-undecided'
					: 'label-factor'
			},

			onSelected: function (event) {
				const data = {
					factor_id: event.target.value,
					stats: this.factor.stats
				}
				console.log(`factor(${this.factor.slug}): selected`)
				this.$emit('selected', { selected: data })
			}
		}
  }
</script>


<style scoped>
label > div {
	display: inline;
}
</style>