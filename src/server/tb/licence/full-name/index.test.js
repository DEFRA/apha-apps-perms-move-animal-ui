import { fullNamePage, FullNamePage } from './index.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { OwnerFullNameAnswer } from '../../../common/model/answer/owner-full-name/owner-full-name.js'
import { emailAddressPage } from '../email-address/index.js'
import { yourNamePage } from '../your-name/index.js'

const sectionKey = 'licence'
const question =
  'What is the name of the person registered as the keeper of the animals?'
const questionKey = 'fullName'
const view = 'common/model/page/question-page.njk'
const pageUrl = '/receiving-the-licence/licence-name'

describe('FullNamePage', () => {
  let page

  beforeEach(() => {
    page = new FullNamePage()
  })

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(view)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(OwnerFullNameAnswer)
  })

  describe('nextPage', () => {
    it('should return yourNamePage when both origin and destination are TB restricted', () => {
      const context = {
        origin: {
          originType: 'tb-restricted-farm'
        },
        destination: {
          destinationType: 'tb-restricted-farm'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(yourNamePage)
    })

    it('should return yourNamePage when both origin and destination are "other" type', () => {
      const context = {
        origin: {
          originType: 'other'
        },
        destination: {
          destinationType: 'other'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(yourNamePage)
    })

    it('should return yourNamePage when origin is TB restricted and destination is "other"', () => {
      const context = {
        origin: {
          originType: 'tb-restricted-farm'
        },
        destination: {
          destinationType: 'other'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(yourNamePage)
    })

    it('should return emailAddressPage when only origin is TB restricted', () => {
      const context = {
        origin: {
          originType: 'tb-restricted-farm'
        },
        destination: {
          destinationType: 'unrestricted-farm'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(emailAddressPage)
    })

    it('should return emailAddressPage when neither origin nor destination are TB restricted', () => {
      const context = {
        origin: {
          originType: 'unrestricted-farm'
        },
        destination: {
          destinationType: 'afu'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(emailAddressPage)
    })

    it('should return emailAddressPage when context is undefined', () => {
      const nextPage = page.nextPage(null, undefined)

      expect(nextPage).toBe(emailAddressPage)
    })

    it('should return emailAddressPage when origin is undefined', () => {
      const context = {
        destination: {
          destinationType: 'tb-restricted-farm'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(emailAddressPage)
    })

    it('should return emailAddressPage when destination is undefined', () => {
      const context = {
        origin: {
          originType: 'tb-restricted-farm'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(emailAddressPage)
    })

    it('should return emailAddressPage when originType is undefined', () => {
      const context = {
        origin: {},
        destination: {
          destinationType: 'tb-restricted-farm'
        }
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(emailAddressPage)
    })

    it('should return emailAddressPage when destinationType is undefined', () => {
      const context = {
        origin: {
          originType: 'tb-restricted-farm'
        },
        destination: {}
      }

      const nextPage = page.nextPage(null, context)

      expect(nextPage).toBe(emailAddressPage)
    })
  })

  it('should export page', () => {
    expect(fullNamePage).toBeInstanceOf(FullNamePage)
  })

  describePageSnapshot({
    describes: 'FullNamePage.content',
    it: 'should render expected response and content',
    pageUrl
  })
})
