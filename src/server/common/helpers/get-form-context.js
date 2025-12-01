import Boom from '@hapi/boom'
import { FormModel } from '@defra/forms-engine-plugin/engine/models/index.js'
import {
  getCacheService,
  evaluateTemplate
} from '@defra/forms-engine-plugin/engine/helpers.js'
import { getAnswer } from '@defra/forms-engine-plugin/engine/components/helpers/components.js'
import { TerminalPageController } from '@defra/forms-engine-plugin/controllers/index.js'

/**
 * @import { Request } from '@hapi/hapi'
 * @import { PluginOptions, FormStatus, FormContext, FormRequestPayload } from '@defra/forms-engine-plugin/types'
 * @import { PageControllerClass } from '@defra/forms-engine-plugin/engine/pageControllers/helpers/pages.js'
 */

/**
 *
 * @param {string} slug
 * @param {FormStatus} state
 * @param {Required<Pick<PluginOptions, 'controllers' | 'services'>>} options
 * @returns {Promise<FormModel>}
 */
export async function getFormModel(slug, state, options) {
  const { formsService } = options.services

  const metadata = await formsService.getFormMetadata(slug)

  if (!metadata) {
    throw Boom.notFound(`No metadata found for slug ${slug}`)
  }

  const versionNumber = metadata.versions?.[0]?.versionNumber

  // Get the form definition using the `id` from the metadata
  const definition = await formsService.getFormDefinition(metadata.id, state)

  if (!definition) {
    throw Boom.notFound(
      `No definition found for form metadata ${metadata.id} (${slug}) ${state}`
    )
  }

  return new FormModel(
    definition,
    { basePath: slug, versionNumber },
    options.services,
    options.controllers
  )
}

/**
 * build a FormContext for a given journey by replaying the cached state that the
 * forms engine stores in yar. This mirrors how the plugin prepares context when
 * handling a GET request for the review/summary page.
 * @param {Request} request - The incoming hapi request (provides yar + server reference)
 * @param {string} journey - Slug of the journey to load (for example `tb-origin`)
 * @param {'live' | 'preview' | 'draft'} state - Which journey state to load
 * @param {Pick<PluginOptions, 'services' | 'controllers'>} [overrides]
 * @returns {Promise<FormContext>} The hydrated form context for the journey
 */
export async function getFormContext(
  { server, yar },
  journey,
  state = 'live',
  overrides
) {
  const pluginOptions = overrides ?? (await resolvePluginOptions())
  const { services, controllers } = pluginOptions
  /**
   * fetch the FormModel for the requested journey/state combination. We pass in
   * the local services bundle and any custom controllers required by the journey.
   */
  const formModel = await getFormModel(journey, state, {
    services,
    controllers
  })

  /**
   * the cache service exposes helper methods that the forms engine normally uses
   * inside its hapi routes. We reuse it here to read the persisted session state.
   */
  // @ts-expect-error hapi type mismatch between plugin and host app
  const cacheService = getCacheService(server)

  /** @type {FormRequestPayload} */
  const summaryRequest = {
    /**
     * reuse the caller's yar instance so the cache lookup is scoped to the user
     */
    yar,
    /**
     * the summary screen is requested as a GET
     */
    method: 'get',
    /**
     * the engine expects params.path to describe the current page and slug
     */
    params: {
      path: 'summary',
      slug: journey
    },
    /**
     * no query parameters are needed, but the object must exist
     */
    query: {}
  }

  /**
   * pull the latest persisted answers/state for the journey. This replicates the
   * call the SummaryPageController would make before rendering the page.
   */
  const cachedState = await cacheService.getState(summaryRequest)

  /**
   * The engine requires a reference number in state (normally added post-submit).
   * Until we have a real value available, keep the TODO placeholder to satisfy
   * the FormModel contract and merge in the cached answers.
   */
  const formState = {
    $$__referenceNumber: 'TODO',
    ...cachedState
  }

  /**
   * finally delegate back to the FormModel, which will derive the complete
   * FormContext (pages, answers, validation state, etc.).
   */
  return formModel.getFormContext(summaryRequest, formState, [])
}

/**
 * Determine the first page the user must (re)visit based on the supplied form
 * context. This mirrors the forms engine behaviour where `context.paths`
 * contains all relevant page paths up to the first invalid screen.
 * @param {FormContext | undefined} context
 * @returns {PageControllerClass | undefined}
 */
export function getFirstJourneyPage(context) {
  if (!context?.relevantPages) {
    /**
     * without context - or one with relevant pages - there is nothing to inspect, so no next page can be determined.
     */
    return undefined
  }

  const lastPageReached = context.relevantPages.at(-1)
  const penultimatePageReached = context.relevantPages.at(-2)

  /**
   * if the last page was an exit page, **and** there is a page before that,
   * then return the page before it
   */
  if (
    lastPageReached instanceof TerminalPageController &&
    penultimatePageReached
  ) {
    return penultimatePageReached
  }

  /*
   * in all other cases, return the last page reached.
   * it will either be:
   * - the exit page (where a journey only has an exit page)
   * - a summary page (in which case, the journey is complete)
   * - the last unanswered question, since the engine short-circuits at that point
   */
  return lastPageReached
}

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

async function resolvePluginOptions() {
  const module = await import(
    '~/src/server/common/plugins/defra-forms/index.js'
  )

  if (!module?.pluginOptions?.services || !module?.pluginOptions?.controllers) {
    throw new Error('DEFRA Forms plugin options are not available')
  }

  return module.pluginOptions
}
