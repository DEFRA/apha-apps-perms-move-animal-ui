/**
 * @typedef {{
 *   applicationVersion: SemanticVersion,
 *   applicationType: string,
 *   questions: Question[]
 * }} Application
 * @typedef {{
 *  question: string,
 *  question_key: string,
 *  answer: object,
 *  answer_key?: string
 * }} Question
 * @typedef {{
 *   major: number,
 *   minor: number,
 *   patch: number
 * }} SemanticVersion
 */

/** @type {Question} */
const premises = {
  question_key: 'on_off_premises',
  question: 'Are you moving the cattle on or off your farm or premises?',
  answer: 'On to the farm or premises',
  answer_key: 'on_to_premises'
}

/** @type {Question} */
const originCPH = {
  question_key: 'origin_cph',
  question:
    'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?',
  answer: '12/345/6789'
}

/** @type {Question} */
const originAddress = {
  question_key: 'origin_cph',
  question:
    'What is the address of your farm or premises where the animals are moving off?',
  answer: {
    addressLine1: 'Starfleet Headquarters',
    addressTown: 'San Francisco',
    addressPostcode: 'RG24 8RR'
  }
}

/** @type {Application} */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const applicationJourney = {
  applicationType: 'MOVE_ANIMALS_BOVINE_TB',
  applicationVersion: { major: 0, minor: 1, patch: 0 },
  questions: [premises, originCPH, originAddress]
}
