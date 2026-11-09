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
   * @param {string} dilutionRate
   * @param {boolean} isUndiluted
   * @param {import('@hapi/hapi').Request | null} [request]
   * @returns {string}
   */
  _formatDilutionRateText(dilutionRate, isUndiluted, request) {
    return isUndiluted
      ? translate(
          request,
          'tb.biosecurity.dilutionRate.answer.undiluted',
          'I confirm the disinfectant is used undiluted on the farm or premises'
        )
      : translate(request, 'tb.biosecurity.dilutionRate.answer.prefix', 'I confirm a dilution rate of 1:') +
        dilutionRate +
        translate(request, 'tb.biosecurity.dilutionRate.answer.suffix', ' is used on the farm or premises')
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
      text: this._formatDilutionRateText(
        disinfectantDetails?.dilutionRate,
        disinfectantDetails?.isUndiluted,
        request
      ),
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
    return this.getDisplayText(null)
  }

  /**
   * @param {import('@hapi/hapi').Request | null} [request]
   * @returns {string}
   */
  getDisplayText(request) {
    const data = ensureArray(this._data?.[this.config.payloadKey])

    if (data.length === 0) {
      return 'None'
    }
    return Object.values(data)
      .map((value) => this._formatDilutionRateText(value, value === 'Undiluted', request))
      .join('\n\n')
  }
}
