<template>
	<footer class="app-footer">
		<div class="wrapper">
			<p>Designed and made with &hearts; in Munich</p>
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
