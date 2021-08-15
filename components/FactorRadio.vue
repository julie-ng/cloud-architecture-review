<template>
	<div class="factor">
		<label :for=factor.slug>
			<input type="radio" :name=inputName :id=factor.slug :value=factor.slug v-on:change="onChange" >
			<h4>{{ factor.title }}</h4>
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
			onChange: function (event) {
				console.log('oh changed!', event.target.value)
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