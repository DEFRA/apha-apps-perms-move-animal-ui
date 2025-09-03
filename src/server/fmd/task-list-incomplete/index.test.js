import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { taskListIncompletePage } from './index.js'

/** @import { Server } from '@hapi/hapi' */

describe('TaskListIncompletePage', () => {
  const page = taskListIncompletePage

  it('should have the right view', () => {
    expect(page.view).toBe('fmd/task-list-incomplete/index.njk')
  })

  it('should have the right url', () => {
    expect(page.urlPath).toBe('/fmd/task-list-incomplete')
  })

  it('should have the right page title', () => {
    expect(page.pageTitle).toBe(
      'You need to complete all of the sections before you review and submit'
    )
  })

  it('should have the right heading', () => {
    expect(page.heading).toBe(
      'You need to complete all of the sections before you review and submit'
    )
  })

  describePageSnapshot({
    describes: 'TaskListIncompletePage',
    it: 'should have the expected content',
    pageUrl: page.urlPath
  })
})
