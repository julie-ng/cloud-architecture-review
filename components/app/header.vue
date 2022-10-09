<template>
	<header class="app-header navbar is-fixed-top no-underlined-links">
		<div class="container is-max-widescreen">

			<div class="navbar-brand">

				<NuxtLink  class="navbar-title navbar-item" to="/">
					<img src="/images/cloudkube/kubewave.svg" alt="Cloudkube Logo" class="cloudkube-logo">
					cloudkube.io
					<!-- <span class="slashes">//</span><span class="section-title">Review</span> -->
				</NuxtLink>


				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" id="js-nav-burger">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div class="navbar-menu" id="js-nav-menu">
				<nav aria-label="main navigation" class="navbar-end">
					<NuxtLink class="navbar-item" to="/about">About</NuxtLink>
					<NuxtLink class="navbar-item" to="/getting-started">Getting Started</NuxtLink>
					<NuxtLink class="navbar-item" to="/guide">Guide</NuxtLink>
					<div class="navbar-item buttons">
						<NuxtLink class="button is-link is-light" to="/review">Review your Design</NuxtLink>
					</div>
				</nav>
			</div>

		</div>
	</header>
</template>


<script>
	export default {
		mounted () {
			const btn = document.getElementById('js-nav-burger')
			const menu = document.getElementById('js-nav-menu')
			// console.log('[Header] - mounted')
			btn.addEventListener('click', () => {
				// console.log('[Nav Burger] - click')
				btn.classList.toggle('is-active')
				menu.classList.toggle('is-active')
			})
		}
	}
</script>
