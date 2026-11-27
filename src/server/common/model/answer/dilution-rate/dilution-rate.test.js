import { CheckboxAnswer } from '../checkbox/checkbox.js'
import { DilutionRateAnswer } from './dilution-rate.js'
/** @import {DilutionRatePayload} from './dilution-rate.js' */

jest.mock('../../../apis/index.js', () => ({
  fetchDisinfectants: jest.fn().mockResolvedValue([
    { name: 'Diluted', dilutionRate: '10', isUndiluted: false },
    { name: 'Undiluted', dilutionRate: '0', isUndiluted: true }
  ])
}))

/** @type {DilutionRatePayload} */
const payload = {
  dilutionRate: ['dilutionRateConfirmed']
}

describe('DilutionRate', () => {
  it('should be a checkbox', () => {
    expect(new DilutionRateAnswer(payload)).toBeInstanceOf(CheckboxAnswer)
  })

  it('should have the right payload key', () => {
    expect(DilutionRateAnswer.config.payloadKey).toBe('dilutionRate')
  })

  it('should define the right empty input message', () => {
    expect(DilutionRateAnswer.config.validation.empty?.message).toBe(
      'You need to tick the confirmation box'
    )
  })

  it('should have the right isPageHeading value', () => {
    expect(DilutionRateAnswer.config.isPageHeading).toBe(false)
  })

  describe('viewModel translation', () => {
    const translations = {
      'tb.biosecurity.dilutionRate.answer.diluted': (params) =>
        `Translated rate 1:${params.dilutionRate} on the premises`,
      'tb.biosecurity.dilutionRate.answer.undiluted': () =>
        'Translated undiluted'
    }

    it.each([
      {
        description: 'diluted text',
        disinfectant: 'Diluted',
        rate: '10',
        text: 'Translated rate 1:10 on the premises'
      },
      {
        description: 'undiluted text',
        disinfectant: 'Undiluted',
        rate: '0',
        text: 'Translated undiluted'
      }
    ])(
      'should translate $description',
      async ({ disinfectant, rate, text }) => {
        const translate = jest.fn(
          (key, fallback, params) => translations[key]?.(params) ?? fallback
        )
        const answer = new DilutionRateAnswer(
          { dilutionRate: [rate] },
          { biosecurity: { disinfectant } }
        )
        const viewModel = await answer.viewModel({
          question: 'Rate?',
          translate
        })

        expect(viewModel.items[0]).toMatchObject({
          text,
          value: rate,
          checked: true
        })
      }
    )

    it.each([
      {
        disinfectant: 'Diluted',
        rate: '10',
        text: 'I confirm a dilution rate of 1:10 is used on the farm or premises'
      },
      {
        disinfectant: 'Undiluted',
        rate: '0',
        text: 'I confirm the disinfectant is used undiluted on the farm or premises'
      }
    ])(
      'should use the fallback for $disinfectant text',
      async ({ disinfectant, rate, text }) => {
        const translate = jest.fn((_key, fallback) => fallback)
        const answer = new DilutionRateAnswer(
          { dilutionRate: [rate] },
          { biosecurity: { disinfectant } }
        )
        const viewModel = await answer.viewModel({
          question: 'Rate?',
          translate
        })

        expect(viewModel.items[0]).toMatchObject({
          text,
          value: rate,
          checked: true
        })
      }
    )
  })
})
