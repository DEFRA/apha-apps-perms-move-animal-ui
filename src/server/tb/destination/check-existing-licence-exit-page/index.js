import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { TbStateManager } from '../../state-manager.js'
import { translate } from '~/src/server/common/helpers/i18n/index.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class CheckExistingLicenceExitPage extends ExitPage {
  urlPath = '/destination/check-existing-licence'
  pageTitle = 'This service is not available for your movement type'
  titleI18nKey = 'tb.destination.checkExistingLicenceExitPage.title'
  view = `tb/destination/check-existing-licence-exit-page/index`
  key = 'CheckExistingLicenceExitPage'
  sectionKey = 'destination'

  async viewProps(req) {
    const applicationState = new TbStateManager(req).toState()
    const selectedOrigin = applicationState?.origin?.originType
    const selectedDestination = applicationState?.destination?.destinationType
    return Promise.resolve({
      customText:
        selectedOrigin === 'afu' || selectedDestination === 'afu'
          ? translate(
              req,
              'tb.destination.checkExistingLicenceExitPage.customTextAfu',
              'If the approved finishing unit (AFU) has already been set up'
            )
          : translate(
              req,
              'tb.destination.checkExistingLicenceExitPage.customTextNonAfu',
              'If the TB isolation unit has already been set up and approved'
            )
    })
  }
}

export const checkExistingLicenceExitPage = new CheckExistingLicenceExitPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const checkExistingLicence = new PageController(
  checkExistingLicenceExitPage,
  {
    methods: ['GET']
  }
).plugin()
