import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { originAddressPage } from './index.js'
import { AddressAnswer } from '~/src/server/common/model/answer/address/address.js'
import { MockOriginPage } from '../mock-page/index.js'

const sectionKey = 'origin'
const questionKey = 'originAddress'
const pageUrl = '/fmd/movement-origin/address'
const page = originAddressPage
const question = 'What is the origin premises address?'

describe('OriginAddressPage', () => {
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
    expect(page.Answer).toBe(AddressAnswer)
  })

  describe('nextPage', () => {
    it('should return MockOriginPage for any value', () => {
      // commented deliberately please disregard for now
      // const answer = new Answer(payload)
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(MockOriginPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
