import TopicSchema from './topic'

const input = {
	slug: 'model',
	description: "Azure CNI vs Kubenet...longer helping text if people don't understand what this question means.",
	title: 'What is your networking model?',
	shortTitle: 'Networking Model',
	factors: [{ slug: 'azure-cni' }, { slug: 'kubenet' }],
	dir: '/guide/networking',
	path: '/guide/networking/model',
	extension: '.md'
}

const expectedOutput = {
	slug: 'model',
	description: "Azure CNI vs Kubenet...longer helping text if people don't understand what this question means.",
	title: 'What is your networking model?',
	shortTitle: 'Networking Model',
	factors: [
		{ path: '/guide/networking/factors/azure-cni', slug: 'azure-cni' },
		{ path: '/guide/networking/factors/kubenet', slug: 'kubenet' }
	],
	dir: '/guide/networking',
	path: '/guide/networking/model',
	inputName: 'networking-model'
}

describe('TopicSchema', () => {
	it('can normalize nuxtjs $content', () => {
		expect(TopicSchema.normalize(input)).toEqual(expectedOutput)
	})

	it('can also figure out input name based on $content results', () => {
		expect(TopicSchema.extractInputName(input)).toEqual('networking-model')
	})
})
