import { TbQuestionPageController } from '../../question-page-controller.js'
import { EarTagsPage } from '../ear-tags/index.js'

const customHeading =
  'Official ear tag numbers for animals 42 days old or older'

export class EarTagsOver42DaysOldPage extends EarTagsPage {
  urlPath = '/identification/enter-ear-tags-over-42-days'
  question = 'Enter the ear tag numbers for these animals'

  get heading() {
    return customHeading
  }
}

export const earTagsOver42DaysOldPage = new EarTagsOver42DaysOldPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const earTagsOver42DaysOld = new TbQuestionPageController(
  earTagsOver42DaysOldPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
