import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

export class PrivacyPolicyPage extends Page {
  skipAuth = true
  sectionKey = 'policies'
  key = 'privacy'
  pageTitle = 'Privacy Policy'
  pageHeading = 'Privacy Policy'
  urlPath = '/privacy-policy'
  view = 'privacy-policy/index'
  titleI18nKey = 'common.privacy.title'
  headingI18nKey = 'common.privacy.title'
}

export const privacyPolicyPage = new PrivacyPolicyPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const privacyPolicy = new PageController(privacyPolicyPage).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
