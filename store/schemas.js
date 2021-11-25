import defaults from './defaults'

export default {
  scoreCache () {
    const schema = {}
    defaults.CATEGORIES.forEach((c) => {
      schema[c] = {
        higher: {},
        lower: {}
      }
    })
    return schema
  }
}

// Use factor slug as key to avoid having to sort later
// const lower = {}
// lower['factors/requirements/multi-tenant'] = {
//   questionPath: 'questions/requirements/tenancy',
//   score: -25
// }

//   /**
//    * Factors used in `higher` or `lower` arrays
//    * The paths are cached for faster
//    *
//    * @param {String} question - path relative to `content/` folder for context, e.g. 'questions/requirements/tenancy'
//    * @param {String} factor - path relative to `content/` folder for stats, e.g. 'factors/requirements/multi-tenant'
//    * @param {Integer} score
//    * @returns
//    */
//   scoreCacheFactor: function (question, factor, score) {
//     return {
//         questionPath: question,
//         factorPath: factor,
//         sccore: score
//     }
//   }
// }

// var scoreCache = {
//   complexity: {
//     higher: [
//       {
//         questionPath: 'questions/requirements/dr',
//         factorPath: 'factors/requirements/dr-active-active',
//         score: 15
//       }
//     ],
//     lower: [
//     ]
//   },
//   operations: {},
//   security: {
//     higher: [],
//     lower: [
//       {
//         questionPath: 'questions/requirements/tenancy',
//         factorPath: 'factors/requirements/multi-tenant',
//         score: -25
//       }
//     ]
//   },
//   price: {}
// }
