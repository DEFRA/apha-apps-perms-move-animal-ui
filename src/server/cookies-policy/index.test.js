import {} from '../common/test-helpers/config.js'
import { describePageSnapshot } from '../common/test-helpers/snapshot-page.js'

describePageSnapshot({
  describes: '#cookiesPolicyPage',
  it: 'should render expected response and content',
  pageUrl: '/cookies'
})
