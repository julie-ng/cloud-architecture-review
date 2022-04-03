<template>
	<header class="app-header">
		<div class="container-wrapper">
			<div>
				<h1><NuxtLink to="/">Azure Kubernetes <span>|</span> Architecture</NuxtLink></h1>
			</div>
			<div>
				<nav>
					<ul>
						<li><NuxtLink to="/about">About</NuxtLink></li>
						<li><NuxtLink to="/getting-started">Getting Started</NuxtLink></li>
						<li><NuxtLink to="/review" class="btn btn-sm btn-primary-outline">Review your Design</NuxtLink></li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>

<style scoped>
	.container-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	/* vertically align heading */
	.container-wrapper > div:first-child {
		display: flex;
  	align-items: center;
	}

	.container-wrapper > div {
		vertical-align: middle;
		/* border: 1px solid blue; */
	}

	.container-wrapper > div:nth-child(2) {
		text-align: right;
	}

	h1 {
		/* border: 1px solid red; */
		display: inline;
		vertical-align: middle;
		margin: 0;
	}

	a.btn:hover,
	a.btn:active {
		color: #fff;
	}
</style>