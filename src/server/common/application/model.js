/**
 * @typedef {{
 *   applicationVersion: SemanticVersion,
 *   applicationType: string,
 *   questions: Question[]
 * }} Application
 */

/**
 * @typedef {{
 *  question: string,
 *  question_key: string,
 *  answer: { [key:string]: Data },
 * }} Question
 */

/**
 * @typedef {{
 *   major: number,
 *   minor: number,
 *   patch: number
 * }} SemanticVersion
 */

/**
 * @typedef {{key?: string, value: string}} Data
 */

/** @type {Question} */
const premises = {
  question_key: 'on_to_farm',
  question: 'Are you moving the cattle on or off your farm or premises?',
  answer: {
    onToFarm: {
      value: 'On to the farm or premises',
      key: 'on_to_farm'
    }
  }
}

/** @type {Question} */
const originCPH = {
  question_key: 'origin_cph',
  question:
    'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?',
  answer: { cphNumber: { value: '12/345/6789' } }
}

/** @type {Question} */
const originAddress = {
  question_key: 'origin_cph',
  question:
    'What is the address of your farm or premises where the animals are moving off?',
  answer: {
    addressLine1: { value: 'Starfleet Headquarters' },
    addressTown: { value: 'San Francisco' },
    addressPostcode: { value: 'RG24 8RR' }
  }
}

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const application = {
  applicationType: 'MOVE_ANIMALS_BOVINE_TB',
  applicationVersion: { major: 0, minor: 1, patch: 0 },
  questions: [premises, originCPH, originAddress]
}

// V 0.1.0
// The *type* of movement is being asked for, and the exact wording is specific to farms

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, camelcase
const applicationv0_1_0 = {
  applicationType: 'MOVE_ANIMALS_BOVINE_TB',
  applicationVersion: { major: 0, minor: 1, patch: 0 },
  questions: [
    {
      question_key: 'on_to_farm',
      question: 'Are you moving the cattle on or off your farm?',
      answer: { onToFarm: { value: 'On to the farm', key: 'on_to_farm' } }
    }
  ]
}

// V 0.1.1
// The *type* of movement is being asked for and the answer wording changes
// *but* the underlying intention remains the same.
//
// The question_key and answer_key stay constant to allow for this evolution.
//
// NOTE that the question_key and answer_key are a bit misleading here, because
// they originated at a time when we didn't know to expand the scope to premises
// (hence why we didn't get the question right in the first place)
//
// This is the sort of 'blurring' that we can expect.
// Another example might be: "How many Cattle are you moving?" vs "How many animals are you moving?"

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, camelcase
const applicationv0_1_1 = {
  applicationType: 'MOVE_ANIMALS_BOVINE_TB',
  applicationVersion: { major: 0, minor: 1, patch: 1 },
  questions: [
    {
      question_key: 'on_to_farm',
      question: 'Are you moving the cattle on or off your farm or premises?',
      answer: {
        onToFarm: { value: 'On to the farm or premises', key: 'on_to_farm' }
      }
    }
  ]
}
