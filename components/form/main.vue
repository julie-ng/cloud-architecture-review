<template>
	<div class="form-categories">
		<form-category
			v-for="cat of categories"
			:title=cat.name
			:key=cat.name
			:questions=cat.questions
		>
		</form-category>
	</div>
</template>

<script>
	export default {
		computed: {
    	categories () {
      	return this.$store.getters.form
			}
		}
	}
</script>
