import { fetchDisinfectants } from '../../../apis/index.js'
import { ensureArray } from '../../../helpers/ensure-array.js'
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
      empty: {
        message: 'You need to tick the confirmation box',
        i18nKey: 'tb.biosecurity.dilutionRate.empty'
      }
    }
  }

  /**
   * @param {string} dilutionRate
   * @param {AnswerViewModelOptions['translate']} translate
   * @returns {string}
   */
  formatDilutionRateText(dilutionRate, translate) {
    return translate(
      'tb.biosecurity.dilutionRate.answer.diluted',
      `I confirm a dilution rate of 1:${dilutionRate} is used on the farm or premises`,
      { dilutionRate }
    )
  }

  /**
   * @param {AnswerViewModelOptions['translate']} translate
   * @returns {string}
   */
  formatUndilutedText(translate) {
    return translate(
      'tb.biosecurity.dilutionRate.answer.undiluted',
      'I confirm the disinfectant is used undiluted on the farm or premises'
    )
  }

  /**
   * @param {AnswerViewModelOptions} viewModelOptions
   */
  async viewModel(viewModelOptions) {
    const viewModel = await super.viewModel(viewModelOptions)

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
      text: disinfectantDetails.isUndiluted
        ? this.formatUndilutedText(viewModelOptions.translate)
        : this.formatDilutionRateText(
            disinfectantDetails.dilutionRate,
            viewModelOptions.translate
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
