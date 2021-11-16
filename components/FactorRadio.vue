<template>
	<div class="factor">
		<label v-if=isUndecided() :for=factor.slug class="label-undecided">
			<input ref="input" type="radio"
				:name=inputName
				:id=factor.slug
				:key=factor.slug
				:value=factor.slug
				v-on:change="onSelected"
			>
			<h4>Reset</h4>
		</label>

		<label v-else :for=factor.slug class="label-factor">
			<input ref="input" type="radio"
				:name=inputName
				:id=factor.slug
				:key=factor.slug
				:value=factor.slug
				v-on:change="onSelected"
			>
			<h4><NuxtLink :to=factor.path>{{ factor.title }}</NuxtLink></h4>
			<p>{{ factor.description }}</p>
		</label>

		<!-- <pre>{{ stats }}</pre> -->
	</div>
</template>

<script>
  export default {
    props: {
      factor: {
        type: Object,
        required: true
      },
			inputName: {
				type: String,
				required: true
			},
			stats: {
				type: Object,
				required: true
			}
    },

		methods: {
			isUndecided: function () {
				const parts = this.factor.slug.split('-')
				return parts[parts.length - 1] === 'undecided'
			},

			onSelected: function (event) {
				const data = {
					id: event.target.value,
					stats: this.factor.stats
				}
				console.log(`factor(${this.factor.slug}): selected`)
				this.$emit('selected', { selected: data })
			}
		}
  }
</script>
