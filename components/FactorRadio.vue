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
			<h4>{{ factor.title }}</h4>
			<div>{{ factor.description }}</div>
		</label>
		<!-- <pre>{{ stats }}</pre> -->
	</div>
</template>

<script>
  export default {

		// Properties
		// ----------
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

		// Methods
		// -------
		methods: {
			onSelected: function (event) {
				const data = {
					id: event.target.value, // this.factor.slug
					stats: this.factor.stats
				}

				console.log(`factor(${this.factor.slug}): selected`)
				this.$emit('selected', { option: data })
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
	}

	input[type="radio"] {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>