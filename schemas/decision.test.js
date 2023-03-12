import DecisionSchema from './decision'

const normalizedQuestion = {
	slug: 'model',
	description: 'Azure CNI vs Kubenet...longer helping text if people don"t understand what this question means.',
	title: 'What is your networking model?',
	shortTitle: 'Networking Model',
	factors: [{ path: '/guide/networking/factors/azure-cni' }, { path: '/guide/networking/factors/kubenet' }],
	dir: '/guide/networking',
	path: '/guide/networking/model',
	inputName: 'networking-model'
}

const normalizedFactor = {
	slug: 'multi-tenant',
	description: 'Cluster is used to host multiple workloads and/or multiple teams',
	dir: '/guide/requirements/factors',
	extension: '.md',
	path: '/guide/requirements/factors/multi-tenant',
	points: { complexity: 100, security: -25, cost: 0, operations: 100 },
	title: 'Multi-tenant Cluster',
	createdAt: '2021-11-27T19:26:39.611Z',
	updatedAt: '2021-11-27T19:24:38.000Z',
	inputValue: 'multi-tenant'
}

describe('DecisionSchema', () => {
	let normalized

	beforeAll(() => {
		normalized = DecisionSchema.normalize(normalizedQuestion, normalizedFactor)
	})

	it('has a decision key (which is question input name)', function () {
		expect(normalized.key).toEqual('networking-model')
	})

	it('has an input value (which is factor input name)', function () {
		expect(normalized.value).toEqual('multi-tenant')
	})

	it('can normalize Question part', function () {
		const expected = {
			slug: 'model',
			path: '/guide/networking/model',
			inputName: 'networking-model',
			shortTitle: 'Networking Model'
		}
		expect(normalized.question).toEqual(expected)
	})

	it('can normalize Factor part', function () {
		const expected = {
			slug: 'multi-tenant',
			path: '/guide/requirements/factors/multi-tenant',
			description: 'Cluster is used to host multiple workloads and/or multiple teams',
			inputValue: 'multi-tenant',
			title: 'Multi-tenant Cluster',
			points: { complexity: 100, security: -25, cost: 0, operations: 100 }
		}
		expect(normalized.factor).toEqual(expected)
	})
})
