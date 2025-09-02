import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { latitudeAndLongitudePage } from './index.js'
import { IsDesignatedPremisesPage } from '../is-designated-premises/index.js'
import { LatitudeAndLongitudeAnswer } from '../../common/model/answer/latitude-and-longitude/latitude-and-longitude.js'

const sectionKey = 'locationOfVisit'
const questionKey = 'latitudeAndLongitude'
const pageUrl = '/fmd/location-of-visit/location-details'
const page = latitudeAndLongitudePage
const question =
  'What are the latitude and longitude measurements for the location of the visit?'

describe('LatitudeAndLongitudePage', () => {
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
    expect(page.Answer).toBe(LatitudeAndLongitudeAnswer)
  })

  it('should have the correct view', () => {
    expect(page.view).toBe(
      'fmd/common/templates/latitude-and-longitude/index.njk'
    )
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
