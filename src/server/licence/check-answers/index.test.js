import { describePageSnapshot } from '../../common/test-helpers/snapshot-page.js'

const pageUrl = '/licence/check-answers'

describe('#licenceSummaryPage', () => {
  describePageSnapshot({
    describes: 'licenceSummaryPage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
