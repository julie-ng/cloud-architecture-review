export default {
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'Cloud In Real Life // Architecture',
		htmlAttrs: {
			lang: 'en',
			class: 'has-navbar-fixed-top'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
			{ rel: 'preconnect', href: 'https://fonts.gstatic.com' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&family=Rubik:ital,wght@0,300;0,400;0,600;1,400&display=swap' }
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [
		'~/scss/main.scss'
	],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [
		'~/plugins/init-store.client.js'
	],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
	],

	content: {
		useCache: true,
		markdown: {
			remarkAutolinkHeadings: {
				content: {
					type: 'element',
					tagName: 'span',
					properties: { className: ['bd-anchor-link'] },
					children: [{ type: 'text', value: '#' }]
				}
			}
		}
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		'@nuxt/content'
	],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
	},

	// Don't pre-fetch because site is large.
	router: {
		prefetchLinks: false,
		middleware: [
			'logging'
		]
	},

	// environment variables
	publicRuntimeConfig: {
		commitSha: process.env.APP_BUILD_SHA || '(unset)',
		repoUrl: process.env.REPO_URL || 'https://github.com/julie-ng/azure-kubernetes-architect'
	}
}
