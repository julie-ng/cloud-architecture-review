<template>
	<div class="score-meter" :for=id>
		<p>
			{{ title }} <span>({{ score }})</span>
		</p>
		<div class="meter-container">
			<div class="meter-bar" :style=getWidth(score)>&nbsp;</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			id: {
				type: String,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			score: {
				type: Number,
				required: true
			}
		},

		methods: {
			getWidth (score) {
				return 'width: ' + score + 'px'
			}
		}
	}
</script>
