import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { fieldParcelNumberPage } from './index.js'
import { IsDesignatedPremisesPage } from '../is-designated-premises/index.js'
import { FieldParcelNumberAnswer } from '../../common/model/answer/field-parcel-number/field-parcel-number.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'fieldParcelNumber'
const pageUrl = '/fmd/location-of-visit/field-parcel-number'
const page = fieldParcelNumberPage
const question = 'What is the field parcel number? '

describe('FieldParcelNumberPage', () => {
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
    expect(page.Answer).toBe(FieldParcelNumberAnswer)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe('fmd/common/templates/field-parcel-number/index.njk')
  })

  describe('nextPage', () => {
    it('should return IsDesignatedPremisesPage for any value', () => {
      const nextPage = page.nextPage()
      expect(nextPage).toBeInstanceOf(IsDesignatedPremisesPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
