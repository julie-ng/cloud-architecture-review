<template>
	<div>
		<app-header/>
		<main class="app-grid container-wrapper">
			<div class="app-nav-col">
				<!-- <app-tab-nav/> -->
				<app-navigation/>
			</div>

			<div class="app-body">
				<Nuxt/>
			</div>

			<app-scoreboard/>
		</main>
		<app-footer/>
	</div>
</template>