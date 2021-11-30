const FactorSchema = require('./factor')

const input = {
	slug: 'kubenet',
	description: 'Standard Plugin',
	title: 'Kubenet',
	complexity: -10,
	security: 0,
	cost: 0,
	operations: -10,
	dir: '/guide/networking/factors',
	path: '/guide/networking/factors/kubenet',
	extension: '.md',
	createdAt: '2021-11-25T23:22:09.881Z',
	updatedAt: '2021-11-26T09:10:32.301Z'
}

const expectedOutput = {
	slug: 'kubenet',
	inputValue: 'kubenet',
	description: 'Standard Plugin',
	title: 'Kubenet',
	points: {
		complexity: -10,
		security: 0,
		cost: 0,
		operations: -10
	},
	dir: '/guide/networking/factors',
	path: '/guide/networking/factors/kubenet'
}

describe('FactorSchema', () => {
	it('can normalize nuxtjs $content', () => {
		expect(FactorSchema.normalize(input)).toEqual(expectedOutput)
	})

	it('can also figure out input name based on $content results', () => {
		expect(FactorSchema.extractInputValue(input)).toEqual('kubenet')
	})

	it('should not strip existing points', () => {
		expect(FactorSchema.normalize(expectedOutput)).toEqual(expectedOutput)
	})
})
