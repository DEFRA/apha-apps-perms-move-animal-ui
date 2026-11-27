import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { TbApplicationModel } from '../application.js'
import { TbStateManager } from '../state-manager.js'
import { TbTaskListController } from './index.js'

const pageUrl = '/task-list'

describe('TbTaskListController', () => {
  it('should be configured with tb specific engine components', () => {
    const controller = new TbTaskListController()

    expect(controller.ApplicationModel).toBe(TbApplicationModel)
    expect(controller.StateManager).toBe(TbStateManager)
  })

  it('should be configured the expected journey parameters', () => {
    const controller = new TbTaskListController()

    expect(controller.urlPath).toBe(pageUrl)
    expect(controller.buttonText).toBe('Review and submit')
    expect(controller.submitUrlPath).toBe('/tb/submit/check-answers')
    expect(controller.pageTitleAndHeading).toBe(
      'Your Bovine Tuberculosis (TB) movement licence application'
    )
    expect(controller.titleAndHeadingI18nKey).toBe('tb.taskList.title')
    expect(controller.buttonTextI18nKey).toBe('tb.taskList.buttonText')
  })

  describePageSnapshot({
    describes: 'TbTaskListController',
    it: 'should have the expected content',
    pageUrl: pageUrl
  })

  describePageSnapshot({
    describes: 'TbTaskListController.welsh',
    it: 'should have the expected content',
    pageUrl: `${pageUrl}?lang=cy`
  })
})
