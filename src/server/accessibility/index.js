import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

const pageTitle = 'Accessibility statement'

export class AccessibilityStatementPage extends Page {
  auth = false
  sectionKey = 'policies'
  key = 'accessibility-statement'
  pageTitle = pageTitle
  pageHeading = pageTitle
  urlPath = '/accessibility-statement'
  view = 'accessibility/index'
}

export const accessibilityStatementPage = new AccessibilityStatementPage()

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const accessibilityStatement = new PageController(
  accessibilityStatementPage
).plugin()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
