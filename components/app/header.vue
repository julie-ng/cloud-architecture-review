<template>
	<header class="app-header navbar is-fixed-top">
		<div class="container is-max-widescreen">

			<div class="navbar-brand">

				<NuxtLink  class="navbar-title navbar-item" to="/">
					<img src="/images/cloudkube/kubewave.svg" alt="Cloudkube Logo" class="cloudkube-logo">
					Azure Kubernetes <span>|</span> Architecture
				</NuxtLink>


				<a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="js-navbar">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div class="navbar-menu" id="js-navbar">
				<nav aria-label="main navigation" class="navbar-end">
					<NuxtLink class="navbar-item" to="/about">About</NuxtLink>
					<NuxtLink class="navbar-item" to="/getting-started">Getting Started</NuxtLink>
					<div class="navbar-item buttons">
						<NuxtLink class="button is-link" to="/review">Review your Design</NuxtLink>
					</div>
				</nav>
			</div>

		</div>
	</header>
</template>
