import Boom from '@hapi/boom'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { config } from '~/src/config/config.js'
import path from 'node:path'
import { context } from '~/src/config/nunjucks/context/context.js'
import defraForms from '@defra/forms-engine-plugin'
import { SectionSummaryPageController } from '../../controller/defra-forms/section-summary-page-controller/section-summary-page-controller.js'

// Read the journey definitions this way as otherwise we get
// SyntaxError: Unexpected identifier 'type'
const getDirname = () => path.dirname(fileURLToPath(import.meta.url))
const tbOriginJourneyDefinition = JSON.parse(
  readFileSync(
    path.join(getDirname(), 'apps-permissions-tb-origin.json'),
    'utf-8'
  )
)

const now = new Date()
const user = {
  id: 'apha-apps-and-permissions',
  displayName: 'APHA Apps and Permissions'
}

const author = {
  createdAt: now,
  createdBy: user,
  updatedAt: now,
  updatedBy: user
}

const tbOriginJourney = {
  id: '48158770-647d-4fde-a3c5-1fc1e28f780e',
  slug: 'tb-origin',
  title: 'DEFRA forms TB - Origin section',
  organisation: 'Defra',
  teamName: 'APHA Apps and Permissions',
  teamEmail: 'apps.and.permissions.test@apha.gov.uk',
  submissionGuidance: 'Submission guidance',
  notificationEmail: 'apps.and.permissions.test@apha.gov.uk',
  ...author,
  live: author
}

const formsService = {
  /** @param {string} slug */
  getFormMetadata: function (slug) {
    switch (slug) {
      case tbOriginJourney.slug:
        return tbOriginJourney
      default:
        throw Boom.notFound(`Form '${slug}' not found`)
    }
  },

  /** @param {string} id */
  getFormDefinition: function (id) {
    switch (id) {
      case tbOriginJourney.id:
        return tbOriginJourneyDefinition
      default:
        throw Boom.notFound(`Form '${id}' not found`)
    }
  }
}

const formSubmissionService = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async persistFiles() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async submit() {}
}

const outputService = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async submit() {}
}

export const services = { formsService, formSubmissionService, outputService }

export const pluginOptions = {
  cache: config.get('session').cache.name,
  nunjucks: {
    paths: [
      path.resolve(getDirname(), '../../templates/layouts'),
      path.resolve(getDirname(), '../../templates/partials'),
      path.resolve(getDirname(), '../../templates'),
      path.resolve(getDirname(), '../../components')
    ],
    baseLayoutPath: 'page.njk'
  },
  baseUrl: config.get('appBaseUrl'),
  viewContext: context,
  services,
  controllers: { SectionSummaryPageController },
  filters: {}
}

export const defraFormsPlugin = {
  plugin: defraForms,
  options: pluginOptions
}
