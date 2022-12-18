<template>
<div class="mt-3">
	<article class="footer-poc-warning has-text-centered py-3">
		<p>
    	<strong>Warning</strong>: this is a proof of concept application used for DevOps demos. Please consider all content as placeholders.
		</p>
	</article>
	<footer class="app-footer footer">
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
</div>
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
