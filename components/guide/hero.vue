<template>
	<section :class="`hero ${heroClasses}`">
	  <div class="hero-body">
		  <div class="container is-max-widescreen gap-on-mobile">
				<p v-if=title class="title">
					{{ title }}
				</p>
				<p v-if=subtitle class="subtitle">
					{{ subtitle }}
				</p>
  		</div>
  	</div>
	</section>
</template>


<script>
export default {
	props: {
		title: String,
		subtitle: String,
		color: {
			type: String,
			default: 'is-link'
		},
		small: {
			type: Boolean,
			default: false
		}
	},

	computed: {
		heroClasses () {
			const styles = ['hero', this.color]
			if (this.small) {
				styles.push('is-small-hero')
			}
			return styles.join(' ')
		}
	}
}
</script>
