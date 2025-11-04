import path from 'node:path'

import formsEnginePlugin from '@defra/forms-engine-plugin'
import { FormModel } from '@defra/forms-engine-plugin/engine/models/index.js'
import * as defaultServices from '@defra/forms-engine-plugin/services/index.js'
import { FileFormService } from '@defra/forms-engine-plugin/file-form-service.js'

import { config } from '~/src/config/config.js'
import { context as buildViewContext } from '~/src/config/nunjucks/context/context.js'
import { fetchDisinfectants } from '~/src/server/common/apis/disinfectant/index.js'
import { DisinfectantPageController } from './DisinfectantPageController.js'
import { BiosecuritySummaryPageController } from './BiosecuritySummaryPageController.js'

export const BIOSECURITY_FORM_SLUG = 'biosecurity'
export const BIOSECURITY_FORM_BASE_PATH = 'biosecurity'
export const BIOSECURITY_FORM_SUMMARY_PATH = '/summary'
const BIOSECURITY_FORM_ID = 'tb-biosecurity-details'
const DISINFECTANT_DETAILS_ROUTE = '/selectedDisinfectantDetails'
const DISINFECTANTS_ROUTE = '/disinfectants'
const DISINFECTANT_COMPONENT_NAME = 'FywYlV'

let formModel
let formServices

async function loadFormModel() {
  if (formModel) {
    return { model: formModel, services: formServices }
  }

  const loader = new FileFormService()
  const root = config.get('root')
  const formPath = path.resolve(
    root,
    'apps-permissions-tb-biosecurity-details.json'
  )

  const now = new Date()
  const user = { id: 'system', displayName: 'System' }
  const author = {
    createdAt: now,
    createdBy: user,
    updatedAt: now,
    updatedBy: user
  }

  const definition = await loader.addForm(formPath, {
    ...author,
    live: author,
    organisation: 'APHA',
    teamName: 'TB Licensing',
    teamEmail: 'csc.tblicensing@apha.gov.uk',
    submissionGuidance:
      'Thanks for submitting your biosecurity information. An APHA vet will review your answers.',
    notificationEmail: null,
    name: 'Apps & Permissions - TB / Biosecurity Details',
    title: 'Biosecurity details',
    id: BIOSECURITY_FORM_ID,
    slug: BIOSECURITY_FORM_SLUG
  })

  await populateDisinfectantList(definition)

  formServices = {
    ...defaultServices,
    formsService: loader.toFormsService()
  }

  const controllers = {
    DisinfectantPageController,
    BiosecuritySummaryPageController
  }

  formModel = new FormModel(
    definition,
    {
      basePath: BIOSECURITY_FORM_BASE_PATH
    },
    formServices,
    controllers
  )

  return { model: formModel, services: formServices }
}

function nunjucksPaths() {
  const root = config.get('root')
  return [
    path.resolve(root, 'src/server/common/templates'),
    path.resolve(root, 'src/server/common/components'),
    path.resolve(root, 'src/server')
  ]
}

function mapDisinfectants(disinfectants) {
  return disinfectants.map((item) => ({
    id: item.name,
    name: item.name,
    text: item.name,
    value: item.name,
    dilutionRate: item.dilutionRate,
    isLiquid: item.isLiquid,
    isUndiluted: item.isUndiluted
  }))
}

async function populateDisinfectantList(definition) {
  const list = definition.lists?.find(
    (item) => item.id === DISINFECTANT_LIST_ID
  )

  if (!list) {
    return
  }

  try {
    const disinfectants = await fetchDisinfectants('tbo')
    list.items = mapDisinfectants(disinfectants)
  } catch (error) {
    console.error('[biosecurity] failed to prime disinfectant list', error)
  }
}

function registerEventRoutes(server) {
  server.route([
    {
      method: ['POST'],
      path: DISINFECTANTS_ROUTE,
      options: {
        auth: false,
        plugins: {
          crumb: false
        }
      },
      handler: async (request, h) => {
        try {
          const disinfectants = await fetchDisinfectants('tbo')
          return h.response({
            disinfectants: mapDisinfectants(disinfectants)
          })
        } catch (error) {
          request.logger.error(
            error,
            '[biosecurity] failed to fetch disinfectants'
          )
          return h.response({ disinfectants: [] })
        }
      }
    },
    {
      method: 'POST',
      path: DISINFECTANT_DETAILS_ROUTE,
      options: {
        auth: false,
        plugins: {
          crumb: false
        }
      },
      handler: async (request, h) => {
        let payload = request.payload
        if (typeof payload === 'string') {
          try {
            payload = JSON.parse(payload)
          } catch {
            payload = {}
          }
        }

        const selectedRaw =
          payload?.data?.main?.[DISINFECTANT_COMPONENT_NAME] ?? undefined
        const selected = Array.isArray(selectedRaw)
          ? selectedRaw.at(0)
          : selectedRaw

        if (selected) {
          try {
            const disinfectants = await fetchDisinfectants('tbo')
            const details = disinfectants.find(
              (disinfectant) => disinfectant.name === selected
            )

            if (details) {
              return h.response({
                selectedDisinfectantDetails: {
                  name: details.name,
                  dilutionRate: details.dilutionRate,
                  isLiquid: details.isLiquid,
                  isUndiluted: details.isUndiluted
                }
              })
            }
          } catch (error) {
            request.logger.error(
              error,
              '[biosecurity] failed to resolve selected disinfectant details'
            )
          }
        }

        return h.response({ selectedDisinfectantDetails: null })
      }
    }
  ])
}

function ensureAbsoluteEventUrl(options, event) {
  if (event.type !== 'http' || !event.options?.url) {
    return
  }

  const baseUrl = config.get('appBaseUrl')

  if (!baseUrl) {
    return
  }

  try {
    // If the URL is already absolute this will succeed and we leave it alone
    new URL(event.options.url)
  } catch {
    // Otherwise provide the base so downstream HTTP helpers can resolve it
    options.baseUrl = baseUrl

    try {
      const absolute = new URL(event.options.url, baseUrl)
      event.options.url = absolute.href
    } catch {
      // leave as-is; Wreck will combine using baseUrl
    }
  }
}

export function getBiosecurityFormModel() {
  if (!formModel) {
    throw new Error('Biosecurity form model has not been initialised')
  }

  return formModel
}

export const biosecurityFormsPlugin = {
  plugin: {
    name: 'biosecurity-forms-engine',
    async register(server) {
      const { model, services } = await loadFormModel()

      registerEventRoutes(server)

      await server.register({
        plugin: formsEnginePlugin,
        options: {
          model,
          services,
          controllers: {
            DisinfectantPageController,
            BiosecuritySummaryPageController
          },
          cache: 'session',
          nunjucks: {
            baseLayoutPath: 'common/templates/layouts/questions.njk',
            paths: nunjucksPaths()
          },
          preparePageEventRequestOptions: ensureAbsoluteEventUrl,
          viewContext: async (request) => {
            const baseContext = buildViewContext(request)
            return {
              ...baseContext,
              config: {
                cdpEnvironment: config.get('isDevelopment')
                  ? 'local'
                  : config.get('env'),
                designerUrl: config.get('appBaseUrl'),
                feedbackLink: config.get('appBaseUrl'),
                phaseTag: baseContext.features?.phaseTag,
                serviceName: config.get('serviceName'),
                serviceVersion: config.get('serviceVersion')
              }
            }
          },
          baseUrl: config.get('appBaseUrl')
        }
      })
    }
  }
}
