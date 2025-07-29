import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'

const pageUrl = '/receiving-the-licence/check-answers'

const testName = 'test_name'
const testSurname = 'test_surname'
const testEmail = 'test@email.com'

const defaultState = {
  fullName: {
    firstName: testName,
    lastName: testSurname
  },
  emailAddress: testEmail
}

describe('#licenceSummaryPage', () => {
  describePageSnapshot({
    describes: '#licenceSummaryPage.content',
    it: 'should render the expected content',
    pageUrl,
    state: {
      application: { licence: defaultState }
    }
  })
})
