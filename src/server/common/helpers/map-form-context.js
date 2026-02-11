import { evaluateTemplate } from '@defra/forms-engine-plugin/engine/helpers.js'
import { getAnswer } from '@defra/forms-engine-plugin/engine/components/helpers/components.js'

/**
 * @import { FormContext } from '@defra/forms-engine-plugin/types'
 * @import { PageControllerClass } from '@defra/forms-engine-plugin/engine/pageControllers/helpers/pages.js'
 */

/**
 * Transform a FormContext into a structure that mirrors how our application
 * records answers (question metadata + formatted answer details).
 * @param {FormContext | undefined} context
 * @param {{ returnPath?: string }} [options]
 */
export function mapFormContextToAnswers(
  context,
  { returnPath = '/summary' } = {}
) {
  if (!context) {
    return []
  }

  const { relevantPages = [], state = {} } = context

  return relevantPages.flatMap((page) => {
    const fields = page?.collection?.fields ?? []

    return fields
      .map((field) => {
        const value = field.getFormValueFromState(state)
        if (!hasRenderableValue(value)) {
          return undefined
        }
        const answerType = mapAnswerType(field)

        return {
          slug: resolveFieldSlug(page),
          changeHref: resolveChangeHref(page, returnPath),
          question: safeEvaluateTemplate(field.title, context),
          questionKey: field.name,
          answer: {
            type: answerType,
            value: mapAnswerValue(answerType, value),
            displayText: getAnswer(field, state) ?? ''
          }
        }
      })
      .filter(Boolean)
  })
}

/**
 * @param {unknown} value
 */
function hasRenderableValue(value) {
  if (value === undefined || value === null) {
    return false
  }

  if (typeof value === 'string') {
    return value.trim().length > 0
  }

  if (Array.isArray(value)) {
    return value.some((entry) => hasRenderableValue(entry))
  }

  if (typeof value === 'object') {
    return Object.values(value).some((entry) => hasRenderableValue(entry))
  }

  return true
}

/**
 * @param {import('@defra/forms-engine-plugin/engine/components/helpers/components.js').Field} field
 */
function mapAnswerType(field) {
  const map = {
    UkAddressField: 'address',
    DatePartsField: 'date',
    MonthYearField: 'date',
    NumberField: 'number',
    CheckboxesField: 'checkbox',
    FileUploadField: 'file'
  }

  return map[field.type] ?? 'text'
}

function mapAnswerValue(type, value) {
  if (type === 'address') {
    const { addressLine1, addressLine2, town, county, postcode } = value
    return {
      addressLine1,
      addressLine2,
      addressTown: town,
      addressCounty: county,
      addressPostcode: postcode
    }
  }

  return value
}

/**
 * @param {string} template
 * @param {FormContext} context
 */
function safeEvaluateTemplate(template, context) {
  try {
    return evaluateTemplate(template, context) ?? template ?? ''
  } catch {
    return template ?? ''
  }
}

/**
 * @param {PageControllerClass | undefined} page
 */
function resolveFieldSlug(page) {
  if (!page) {
    return undefined
  }

  try {
    if (typeof page.getHref === 'function') {
      return page.getHref(page.path ?? '')
    }
  } catch {
    // ignore and fall back to raw path
  }

  return page.path
}

/**
 * @param {PageControllerClass | undefined} page
 * @param {string} summaryPath
 */
function resolveChangeHref(page, summaryPath) {
  const slug = resolveFieldSlug(page)

  if (!page || !slug) {
    return slug
  }

  if (typeof page.getHref !== 'function' || typeof summaryPath !== 'string') {
    return slug
  }

  try {
    const returnTarget = page.getHref(summaryPath)

    if (!returnTarget) {
      return slug
    }

    const url = new URL(slug, 'http://placeholder.local')
    url.searchParams.set('returnUrl', returnTarget)
    return `${url.pathname}${url.search}`
  } catch {
    return slug
  }
}
