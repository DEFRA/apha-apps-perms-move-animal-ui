import { Page } from '~/src/server/common/model/page/page-model.js'
import { PageController } from '~/src/server/common/controller/page-controller/page-controller.js'

export class AccessibilityStatementPage extends Page {
  sectionKey = 'policies'
  key = 'accessibility-statement'
  pageTitle = 'Accessibility statement'
  pageHeading = 'Accessibility statement'
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
