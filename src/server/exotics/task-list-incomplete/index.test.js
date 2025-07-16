import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'
import { taskListIncompletePage } from './index.js'

/** @import { Server } from '@hapi/hapi' */

describe('TaskListIncompletePage', () => {
  const page = taskListIncompletePage

  it('should have the right view', () => {
    expect(page.view).toBe('exotics/task-list-incomplete/index.njk')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe('/exotics/task-list-incomplete')
  })

  describePageSnapshot({
    describes: 'TaskListIncompletePage',
    it: 'should have the expected content',
    pageUrl: page.urlPath
  })
})
