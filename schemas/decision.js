import config from './config'
import _ from './helpers'

/**
 * Decision Schema
 *
 */
class DecisionSchema {
	constructor () {
		return this
	}

	normalize (questionObj, factorObj) {
		const decision = {}
		decision.key = questionObj.inputName
		decision.value = factorObj.inputValue
		decision.question = _.only(questionObj, config.questionExcerpted)
		decision.factor = _.only(factorObj, config.factorExcerpted)
		return decision
	}
}

const schema = new DecisionSchema()
module.exports = schema
