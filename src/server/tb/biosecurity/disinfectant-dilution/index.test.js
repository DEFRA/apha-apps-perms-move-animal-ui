import { DilutionRateAnswer } from '../../../common/model/answer/dilution-rate/dilution-rate.js'
import { describePageSnapshot } from '../../../common/test-helpers/snapshot-page.js'
import { buildingsAnySharedPage } from '../buildings-any-shared/index.js'
import { disinfectantDilutionPage, DisinfectantDilutionPage } from './index.js'

const sectionKey = 'biosecurity'
const question = 'Confirmation of the dilution rate'
const questionKey = 'dilutionRate'
const view = 'tb/biosecurity/disinfectant-dilution/index'
const pageUrl = '/biosecurity/disinfectant-dilution'

jest.mock('~/src/server/common/apis/index.js', () => ({
  fetchDisinfectants: jest.fn().mockResolvedValue([
    {
      name: 'Virkon® LSP',
      dilutionRate: '9',
      isLiquid: false,
      isUndiluted: false
    },
    {
      name: 'Agrichlor',
      dilutionRate: '10',
      isLiquid: false,
      isUndiluted: false
    },
    {
      name: 'Biocid 30',
      dilutionRate: '8',
      isLiquid: false,
      isUndiluted: false
    }
  ])
}))

describe('DisinfectantDilutionPage', () => {
  const page = new DisinfectantDilutionPage()

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
    expect(page.Answer).toBe(DilutionRateAnswer)
  })

  it('nextPage should return buildings any shared page', () => {
    const nextPage = page.nextPage()
    expect(nextPage).toBe(buildingsAnySharedPage)
  })

  it('should export page', () => {
    expect(disinfectantDilutionPage).toBeInstanceOf(DisinfectantDilutionPage)
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response and content when disinfectant previously selected',
    pageUrl,
    state: {
      application: {
        biosecurity: {
          disinfectant: 'Agrichlor'
        }
      }
    }
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response (500) when disinfectant NOT previously selected',
    pageUrl
  })

  describePageSnapshot({
    describes: 'disinfectantDilutionPage.content',
    it: 'should render expected response (500) when disinfectant selected cant be found',
    pageUrl,
    state: {
      application: {
        biosecurity: {
          disinfectant: 'FAM 30'
        }
      }
    }
  })
})
