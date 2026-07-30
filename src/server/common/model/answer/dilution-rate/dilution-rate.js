import { fetchDisinfectants } from '../../../apis/index.js'
import { ensureArray } from '../../../helpers/ensure-array.js'
import { translate } from '../../../helpers/i18n/index.js'
import { CheckboxAnswer } from '../checkbox/checkbox.js'

/** @import {CheckboxConfig, CheckboxData} from '../checkbox/checkbox.js' */
/** @import {AnswerViewModelOptions} from '../answer-model.js' */

/**
 * export @typedef {string} DilutionRateData
 * @typedef {{ dilutionRate: CheckboxData }} DilutionRatePayload
 */

/**
 * @augments {CheckboxAnswer<DilutionRatePayload>}
 */
export class DilutionRateAnswer extends CheckboxAnswer {
  /** @type {CheckboxConfig} */
  static config = {
    payloadKey: 'dilutionRate',
    isPageHeading: false,
    isQuestionHeading: true,
    options: {
      dilutionRateConfirmed: {
        label:
          'I confirm this is the dilution rate used on the farm or premises'
      }
    },
    validation: {
      dynamicOptions: true,
      empty: { message: 'You need to tick the confirmation box' }
    }
  }

  /**
   * @param {AnswerViewModelOptions} options
   */
  async viewModel({ question, validate, request }) {
    const viewModel = await super.viewModel({
      question,
      validate,
      request
    })

    const values = this.value
    const { options } = this.config

    const disinfectants = await fetchDisinfectants('tbo')
    const selectedDisinfectant = this._context?.biosecurity?.disinfectant
    const disinfectantDetails = disinfectants.find(
      (disinfectant) => disinfectant.name === selectedDisinfectant
    )
    if (!disinfectantDetails) {
      return Promise.resolve(viewModel)
    }

    viewModel.items = Object.entries(options).map(([value]) => ({
      text: disinfectantDetails?.isUndiluted
        ? (translate?.(
            request,
            'tb.biosecurity.dilutionRate.answer.undiluted',
            'I confirm the disinfectant is used undiluted on the farm or premises'
          ) ??
          'I confirm the disinfectant is used undiluted on the farm or premises')
        : `${translate?.(request, 'tb.biosecurity.dilutionRate.answer.prefix', 'I confirm a dilution rate of 1:') ?? 'I confirm a dilution rate of 1:'}${disinfectantDetails?.dilutionRate}${translate?.(request, 'tb.biosecurity.dilutionRate.answer.suffix', ' is used on the farm or premises') ?? ' is used on the farm or premises'}`,
      value: disinfectantDetails?.dilutionRate ?? value,
      attributes: {
        'data-testid': `${value}-checkbox`
      },
      checked: (values ?? []).includes(
        disinfectantDetails?.dilutionRate ?? value
      )
    }))

    return Promise.resolve(viewModel)
  }

  get displayText() {
    const data = ensureArray(this._data?.[this.config.payloadKey])

    if (data.length === 0) {
      return 'None'
    }
    return Object.values(data)
      .map((value) => {
        return value !== 'Undiluted'
          ? `I confirm a dilution rate of 1:${value} is used on the farm or premises`
          : 'I confirm the disinfectant is used undiluted on the farm or premises'
      })
      .join('\n\n')
  }
}
