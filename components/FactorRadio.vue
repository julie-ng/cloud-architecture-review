<template>
	<div class="factor">
		<label :for=factor.slug>
			<input type="radio"
				:name=inputName
				:id=factor.slug
				:key=factor.slug
				:value=factor.slug
				v-on:change="onSelected"
			>
			<h4 v-if=isUndecided()>{{ factor.title }}</h4>
			<h4 v-else><NuxtLink :to=factor.path>{{ factor.title }}</NuxtLink></h4>
			<div>{{ factor.description }}</div>
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
					id: event.target.value, // this.factor.slug
					stats: this.factor.stats
				}

				console.log(`factor(${this.factor.slug}): selected`)
				this.$emit('selected', { selected: data })
			}
		}
  }
</script>

<style>
	.factor {
		position: relative;
		padding-left: 2em;

	}

	.factor h4 {
		margin-bottom: 0.5em;
		font-weight: 500;
	}

	input[type="radio"] {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>