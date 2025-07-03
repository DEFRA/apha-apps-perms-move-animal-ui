import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { ExoticsApplicationModel } from '../application.js'
import { ExoticsStateManager } from '../state-manager.js'
import { ExoticsTaskListController } from './index.js'

describe('ExoticsTaskListController', () => {
  const controller = new ExoticsTaskListController()

  it('should have the right title', () => {
    expect(controller.pageTitleAndHeading).toBe(
      'Your foot and mouth disease movement licence application'
    )
  })

  it('should contain the right application model', () => {
    expect(controller.ApplicationModel).toBe(ExoticsApplicationModel)
  })

  it('should contain the state manager', () => {
    expect(controller.StateManager).toBe(ExoticsStateManager)
  })

  it('should have the right url path', () => {
    expect(controller.urlPath).toBe('/exotics/task-list')
  })

  it('should have the right submit url path', () => {
    expect(controller.submitUrlPath).toBe('/exotics/submit/check-answers')
  })

  describePageSnapshot({
    describes: 'ExoticsTaskListController',
    it: 'should have the expected content',
    pageUrl: controller.urlPath
  })
})
