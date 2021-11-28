<template>
	<footer class="app-footer">
		<div class="wrapper">
			<p>&copy; <a href="https://www.youtube.com/c/JulieNgTech/about" target="_blank">Julie Ng</a> 2021. Designed and made with &hearts; in Munich.</p>
			<p v-if=isLocal><span id="js-build-no">(Local Development)</span></p>
			<a v-else :href=treeUrl id="js-build-no" class="commit">Version</a>
		</div>
	</footer>
</template>

<script>
export default {
	data () {
		return {
			isLocal: this.$config.commitSha === '(unset)',
			commitSha: this.$config.commitSha,
			treeUrl: `${this.$config.repoUrl}/tree/${this.$config.commitSha}`
		}
	}
}
</script>
