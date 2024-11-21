/*
 * Our application state must satisfy a number of different constraints:
 *
 * QUESTION DATA
 *
 *  - It must be possible to know the exact questions & answers given
 *  - As questions evolve over time, we need to know which questions are
 *    getting at an underlying meaning so that we can use them to integrate
 *    to downstream systems (e.g. case management, risk engine, data
 *    analytics)
 *  - As multiple-selection answers evolve over time, we need to know
 *    what the options map to
 *
 * JOURNEY DATA
 *
 *   - We need to know what application journey a user was going through (so
 *     we can handle their application correctly when we release a new
 *     version)
 *   - In the long run - when we support many application journeys - we will
 *     need to distinguish between the journeys themselves
 */

/**
 *
 * @typedef {{
 *   applicationVersion: SemanticVersion,
 *   applicationType: Symbol,
 *   questions: Question[]
 * }} Application
 */

/**
 * @typedef {{
 *  question: string,
 *  questionKey: string,
 *  questionType: string,
 *  answer: { [key:string]: Data },
 * }} Question
 */

/**
 * @typedef {{
 *   major: number,
 *   minor: number,
 *   patch: number
 * }} SemanticVersion
 *
 * The semantic version policy suggested here is:
 * **major** - a breaking change to a key (question or answer) that would prevent downstream systems ingesting the data
 * **minor** - addition of new data / new questions / a journey change that changes which pages you hit
 * **patch** - a wording change that brings clarity, but can use the same questionKey and answerKeys without causing confusion
 */

/**
 * @typedef {{key?: string, value: string}} Data
 */

const APPLICATION_TYPES = Object.freeze({
  MOVE_ANIMALS_BOVINE_TB: Symbol('MOVE_ANIMALS_BOVINE_TB')
})

/** @type {Question} */
const premises = {
  questionKey: 'on_to_farm',
  question: 'Are you moving the cattle on or off your farm or premises?',
  questionType: 'radio',
  answer: {
    radio: {
      value: 'On to the farm or premises',
      key: 'on_to_farm'
    }
  }
}

/** @type {Question} */
const originCPH = {
  questionKey: 'origin_cph',
  question:
    'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?',
  questionType: 'cphNumber',
  answer: { cphNumber: { value: '12/345/6789' } }
}

/** @type {Question} */
const originAddress = {
  questionKey: 'origin_address',
  question:
    'What is the address of your farm or premises where the animals are moving off?',
  questionType: 'address',
  answer: {
    addressLine1: { value: 'Starfleet Headquarters' },
    addressTown: { value: 'San Francisco' },
    addressPostcode: { value: 'RG24 8RR' }
  }
}

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const application = {
  applicationType: APPLICATION_TYPES.MOVE_ANIMALS_BOVINE_TB,
  applicationVersion: { major: 0, minor: 1, patch: 0 },
  questions: [premises, originCPH, originAddress]
}

// V 0.1.0
// The *type* of movement is being asked for, and the exact wording is specific to farms

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, camelcase
export const applicationv0_1_0 = {
  applicationType: APPLICATION_TYPES.MOVE_ANIMALS_BOVINE_TB,
  applicationVersion: { major: 0, minor: 1, patch: 0 },
  questions: [
    {
      questionKey: 'on_to_farm',
      question: 'Are you moving the cattle on or off your farm?',
      questionType: 'radio',
      answer: { onToFarm: { value: 'On to the farm', key: 'on_to_farm' } }
    }
  ]
}

// V 0.1.1
// The *type* of movement is being asked for and the answer wording changes
// *but* the underlying intention remains the same.
//
// The questionKey and answer_key stay constant to allow for this evolution.
//
// NOTE that the questionKey and answer_key are a bit misleading here, because
// they originated at a time when we didn't know to expand the scope to premises
// (hence why we didn't get the question right in the first place)
//
// This is the sort of 'blurring' that we can expect.
// Another example might be: "How many Cattle are you moving?" vs "How many animals are you moving?"

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, camelcase
const applicationv0_1_1 = {
  applicationType: APPLICATION_TYPES.MOVE_ANIMALS_BOVINE_TB,
  applicationVersion: { major: 0, minor: 1, patch: 1 },
  questions: [
    {
      questionKey: 'on_to_farm',
      question: 'Are you moving the cattle on or off your farm or premises?',
      questionType: 'radio',
      answer: {
        onToFarm: { value: 'On to the farm or premises', key: 'on_to_farm' }
      }
    }
  ]
}

// testing out some use-cases

/**
 * @params {Application} application
 * @returns {{question: string, answer: {[key:string]: string}, questionType: string}}
 */
export const summary = (application) =>
  application.questions.map(({ question, answer, questionType }) => {
    return {
      question,
      answer: Object.fromEntries(
        Object.entries(answer).map(([k, v]) => [k, v.value])
      ),
      questionType
    }
  })
