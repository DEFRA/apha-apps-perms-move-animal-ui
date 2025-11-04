import { SectionModel } from '~/src/server/common/model/section/section-model/section-model.js'
import { biosecuritySectionIsVisible } from '../../common/model/section/visibility.js'
import { findPage } from '@defra/forms-engine-plugin/engine/helpers.js'

import {
  BIOSECURITY_FORM_BASE_PATH,
  BIOSECURITY_FORM_SLUG,
  BIOSECURITY_FORM_SUMMARY_PATH,
  biosecurityFormsPlugin,
  getBiosecurityFormModel
} from './forms-engine/index.js'

/** @import {SectionConfig} from '~/src/server/common/model/section/section-model/section-model.js' */

export class BiosecuritySection extends SectionModel {
  /** @type {SectionConfig} */
  static config = {
    key: 'biosecurity',
    title: 'Biosecurity details',
    plugin: biosecurityFormsPlugin,
    summaryLink: `/${BIOSECURITY_FORM_BASE_PATH}${BIOSECURITY_FORM_SUMMARY_PATH}?returnUrl=/tb/task-list`,
    isEnabled: () => true,
    isVisible: biosecuritySectionIsVisible
  }

  static firstPageFactory = () => ({
    urlPath: `/${BIOSECURITY_FORM_BASE_PATH}`
  })

  constructor(formState, progress) {
    super([])
    this.formState = formState
    this.progress = progress
  }

  static fromState(state) {
    const formState = state?.biosecurity
    return new BiosecuritySection(formState, evaluateProgress(formState))
  }

  validate() {
    return { isValid: this.progress.isValid }
  }

  buildGdsTaskDetails(applicationState) {
    const progress =
      this.progress ?? evaluateProgress(applicationState?.biosecurity)

    const initialLink =
      progress.firstInvalidHref ?? `/${BIOSECURITY_FORM_BASE_PATH}`

    return {
      title: this.config.title,
      initialLink,
      summaryLink: this.config.summaryLink,
      isValid: progress.isValid,
      isEnabled: this.config.isEnabled(applicationState)
    }
  }
}

function evaluateProgress(formState) {
  const defaultHref = `/${BIOSECURITY_FORM_BASE_PATH}`

  try {
    if (
      !formState ||
      typeof formState !== 'object' ||
      !formState.$$__referenceNumber
    ) {
      return { isValid: false, firstInvalidHref: defaultHref }
    }

    const model = getBiosecurityFormModel()
    const request = {
      method: 'get',
      params: {
        slug: BIOSECURITY_FORM_SLUG,
        path: BIOSECURITY_FORM_SUMMARY_PATH.slice(1)
      },
      query: {},
      payload: undefined
    }

    const context = model.getFormContext(request, formState)
    const hasErrors = Array.isArray(context.errors) && context.errors.length > 0

    if (!hasErrors) {
      const summaryPage = findPage(model, BIOSECURITY_FORM_SUMMARY_PATH)
      return {
        isValid: true,
        firstInvalidHref: summaryPage?.href ?? `${defaultHref}${BIOSECURITY_FORM_SUMMARY_PATH}`
      }
    }

    const nextPath = context.paths.at(-1) ?? model.getStartPath()
    const nextPage = findPage(model, nextPath)

    return {
      isValid: false,
      firstInvalidHref: nextPage?.href ?? defaultHref
    }
  } catch {
    return { isValid: false, firstInvalidHref: defaultHref }
  }
}
