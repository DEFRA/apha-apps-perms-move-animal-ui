import { describePageSnapshot } from '../common/test-helpers/snapshot-page.js'

describePageSnapshot({
  describes: '#destinationSummaryController',
  it: 'should render expected response and content',
  pageUrl: '/cookies'
})

/**
 * @import { Server } from '@hapi/hapi'
 */
