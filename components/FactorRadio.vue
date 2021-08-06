<template>
	<div class="factor">
		<label :for=factor.slug>
			<input type="radio" :name=name :id=factor.slug>
			<h3>{{ factor.title }}</h3>
			{{ factor.description }}
		</label>
		<!-- <pre>{{ factor.points }}</pre> -->
	</div>
</template>

<script>
  export default {
    props: {
      factor: {
        type: Object,
        required: true
      },
			name: {
				type: String,
				required: true
			},
			// points: {
			// 	type: Object,
			// 	required: true
			// }
    }
  }
</script>


<style>
	.factor {
		position: relative;
		padding-left: 2em;
	}

	input[type="radio"] {
		position: absolute;
		top: 0;
		left: 0;
	}
</style>