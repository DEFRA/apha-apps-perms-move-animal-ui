import { TbApplicationModel } from '../application.js'
import { TbStateManager } from '../state-manager.js'
import { TbTaskListController } from './index.js'

describe('TbTaskListController', () => {
  it('should be configured with tb specific engine components', () => {
    const controller = new TbTaskListController()

    expect(controller.ApplicationModel).toBe(TbApplicationModel)
    expect(controller.StateManager).toBe(TbStateManager)
  })

  it('should be configured the expected journey parameters', () => {
    const controller = new TbTaskListController()

    expect(controller.urlPath).toBe('/task-list')
    expect(controller.buttonText).toBe('Review and submit')
    expect(controller.submitUrlPath).toBe('/submit/check-answers')
    expect(controller.pageTitleAndHeading).toBe(
      'Your Bovine Tuberculosis (TB) movement licence application'
    )
  })
})
