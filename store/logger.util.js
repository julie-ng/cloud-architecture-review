const ICONS = {
	default: '🛒',
	action: '🔵',
	mutation: '🟢'
}

export default class StoreLogger {
	constructor () {
		return this
	}

	action (a, msg = '') {
		let str = `${ICONS.default} ${this.#isRendered()} action[${a}] `
		if (msg.length > 0) {
			str = str + `- ${msg}`
		}
		console.log(str)
	}

	mutation (m, msg = '') {
		let str = (`${ICONS.default} ${this.#isRendered()} mutation[${m}]`)
		if (msg.length > 0) {
			str = str + `- ${msg}`
		}
		console.log(str);
	}

	#isRendered () {
		// return '🛒'
		return (process.server)
			? '👾 SSR' //
			: 'CSR' //  🙋‍♀️
	}
}
