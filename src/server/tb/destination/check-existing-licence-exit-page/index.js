import { ExitPage } from '../../../common/model/page/exit-page-model.js'
import { PageController } from '../../../common/controller/page-controller/page-controller.js'
import { TbStateManager } from '../../state-manager.js'

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */

export class CheckExistingLicenceExitPage extends ExitPage {
  urlPath = '/destination/check-existing-licence'
  pageTitle = 'This service is not available for your movement type'
  view = `tb/destination/check-existing-licence-exit-page/index`
  key = 'CheckExistingLicenceExitPage'
  sectionKey = 'destination'

  async viewProps(req) {
    const applicationState = new TbStateManager(req).toState()
    const selectedOrigin = applicationState?.origin?.originType
    return Promise.resolve({
      customText:
        selectedOrigin === 'afu'
          ? 'If the approved finishing unit (AFU) has already been set up'
          : 'If the TB isolation unit has already been set up and approved'
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
