import {} from '../common/test-helpers/config.js'
import { describePageSnapshot } from '../common/test-helpers/snapshot-page.js'

describePageSnapshot({
  describes: '#privacyPolicyPage',
  it: 'should render expected response and content',
  pageUrl: '/privacy-policy'
})
