<template>
	<div>
		<label :for=id>{{ title }} <span>({{ score }})</span></label>
		<meter :id=id min="0" max="100" :value=score>
				at {{ score }}/100
		</meter>
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
		}
	}
</script>

<style scoped>

	div {
		margin-bottom: 0.5rem;
	}

	label {
		display: block;
		text-transform: capitalize;
	}

	label span {
		font-weight: 400;
		color: var(--md-grey-font-color);
	}

	meter {
		display: block;
		width: 200px;
		height: 36px;
		/* appearance: none; */
	}

	meter::-webkit-meter-bar {
		background: #fff;
		border: 1px solid #e1e1e1;
		border-radius: 0;
	}

	meter::-webkit-meter-optimum-value {
		background-color: var(--meter-color);
	}

	meter::-webkit-meter-inner-element {
		border: none;
	}
</style>

