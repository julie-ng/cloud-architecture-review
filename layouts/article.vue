<template>
	<div class="layout-article">
		<app-header/>
		<main class="container is-max-widescreen gap-on-mobile">
			<div class="columns is-desktop mt-2">
				<div class="column article-left-nav mr-6 pt-6">
					<app-navigation/>
				</div>
        <div class="column article-page-content pt-6">
					<Nuxt/>
				</div>
				<div class="column article-right-nav pt-6">
					On this page
				</div>
			</div>
		</main>
		<app-footer/>
	</div>
</template>