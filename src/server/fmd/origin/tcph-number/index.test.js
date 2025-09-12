import { describePageSnapshot } from '~/src/server/common/test-helpers/snapshot-page.js'
import { tcphNumberPage } from './index.js'
import { GridRefPage } from '../grid-ref/index.js'
import { WhatAnimalsPage } from '../what-animals/index.js'
import { TlaOrTcphNumberAnswer } from '../../common/model/answer/tla-tcph-number/tla-or-tcph-number.js'

const sectionKey = 'origin'
const questionKey = 'tlaOrTcphNumber'
const pageUrl = '/fmd/movement-origin/TLA-or-tCPH-number'
const page = tcphNumberPage
const question =
  'What is the TLA or temporary county parish holding (tCPH) number?'

describe('TcphNumberPage', () => {
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
    expect(page.Answer).toBe(TlaOrTcphNumberAnswer)
  })

  describe('nextPage', () => {
    it('should return the correct next page when slaughter on site', () => {
      const nextPage = page.nextPage(
        {},
        {
          about: {
            movementActivityType: 'slaughter-onsite'
          }
        }
      )
      expect(nextPage).toBeInstanceOf(GridRefPage)
    })

    it('should return the correct next page when carcasses', () => {
      const nextPage = page.nextPage(
        {},
        {
          about: {
            whatIsMoving: 'carcasses'
          }
        }
      )
      expect(nextPage).toBeInstanceOf(GridRefPage)
    })

    it('should return the WhatAnimalsPage page when when neither slaughter on site or carcasses', () => {
      const nextPage = page.nextPage(
        {},
        {
          about: {
            whatIsMoving: 'not - carcasses',
            movementActivityType: 'not - slaughter-onsite'
          }
        }
      )
      expect(nextPage).toBeInstanceOf(WhatAnimalsPage)
    })
  })

  describePageSnapshot({
    describes: 'content',
    it: 'should render expected response and content',
    pageUrl
  })
})
