import { spyOnConfig } from '../common/test-helpers/config.js'
import { describePageSnapshot } from '../common/test-helpers/snapshot-page.js'

describe('Cookies Policy Page', () => {
  describe('when authentication is enabled', () => {
    beforeEach(() => {
      spyOnConfig('featureFlags', {
        authEnabled: true,
        authRequired: true
      })
    })

    describePageSnapshot({
      describes: '#cookiesPolicyPage',
      it: 'should render expected response and content',
      pageUrl: '/cookies'
    })
  })

  describe('when authentication is disabled', () => {
    beforeEach(() => {
      spyOnConfig('featureFlags', {
        authEnabled: false
      })
    })

    describePageSnapshot({
      describes: '#cookiesPolicyPage',
      it: 'should render expected response and content',
      pageUrl: '/cookies'
    })
  })
})
