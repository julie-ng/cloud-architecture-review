<template>
	<footer class="app-footer footer mt-3">
		<div class="content has-text-centered has-text-grey-light is-size-7">
			<p>Copyright 2021-2022 <a class="has-text-grey" href="https://www.youtube.com/c/JulieNgTech/about" target="_blank">Julie Ng</a>
			<br>Designed and made with &hearts; in Munich
			<br>
				<a :href=this.$config.repoUrl target="_blank">
					Build {{ this.$config.commitSha }}
				</a>
			</p>

			<button class="button is-small" @click="emptyStorage">Reset Session</button>

		</div>
	</footer>
</template>

<script>
	export default {
		methods: {
			emptyStorage () {
				this.$store.commit('decisions/reset')
			}
		}
	}
</script>
