<template>
	<div class="app-tab-nav">
		<ul>
			<li v-for="link of links" :key=link.path :class=isSelectedClass(link)>
				<NuxtLink :to=getHref(link)>{{ link.title }}</NuxtLink>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data () {
		return {
			links: [
				{
					title: 'Design Review',
					path: '/review'
				},
				{
					title: 'Guide',
					path: '/guide'
				}
			]
		}
	},

	methods: {
		isSelectedClass (link) {
			const current = this.$route.name
			const route = current.split('-')[0]
			return `/${route}` === link.path
				? 'is-selected'
				: ''
		},

		getHref (link) {
			const hasPrev = this.$nuxt.context.from !== undefined
			const prevPath = hasPrev ? this.$nuxt.context.from.path : ''
			const currentSection = this.$route.name.split('-')[0]
			const targetSection = link.path.split('/')[1]

			if (targetSection === 'review' && currentSection !== 'review') {
				const anchor = this.$route.path.split('/').pop()
				return `${link.path}#${anchor}`
			} else if (hasPrev && prevPath.includes(targetSection)) {
				return prevPath
			} else {
				return link.path
			}
		}
	}
}
</script>
