import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { cphDesignatedPage } from './index.js'
import { DestinationAddressPage } from '../destination-address/index.js'
import { CphNumberAnswer } from '~/src/server/common/model/answer/cph-number/cph-number.js'

const sectionKey = 'destination'
const questionKey = 'cphDesignated'
const pageUrl = '/fmd/movement-destination/cph-number'
const page = cphDesignatedPage
const question =
  'What is the county parish holding (CPH) number of the destination premises?'

describe('CphDesignatedPage', () => {
  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })

  it('should have the correct sectionKey', () => {
    expect(page.sectionKey).toBe(sectionKey)
  })

  it('should have the correct questionKey', () => {
    expect(page.questionKey).toBe(questionKey)
  })

  it('should have the correct question', () => {
    expect(page.question).toBe(question)
  })

  it('should have the correct Answer model', () => {
    expect(page.Answer).toBe(CphNumberAnswer)
  })

  describe('nextPage', () => {
    it('should return destinationAddressPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(DestinationAddressPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
