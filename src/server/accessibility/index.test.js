import { describePageSnapshot } from '../common/test-helpers/snapshot-page.js'

describePageSnapshot({
  describes: '#accessibilityStatementPage',
  it: 'should render expected response and content',
  pageUrl: '/accessibility-statement'
})
