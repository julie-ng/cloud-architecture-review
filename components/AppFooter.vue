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

<style>
	footer {
		color: var(--footer-text-color);
		text-align: center;
	}

	footer .wrapper {
		margin-top: 2em;
		padding: 2rem 0;
	}

	.app-footer p {
		margin: 0;
	}

	.commit:link,
	.commit:visited {
		color: #ccc;
	}
</style>
