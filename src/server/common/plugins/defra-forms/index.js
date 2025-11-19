import Boom from '@hapi/boom'
import tbOriginJourneyDefinition from './apps-permissions-tb-origin.json' with { type: 'json' }
import { config } from '~/src/config/config.js'
import path from 'path'
import { context } from '~/src/config/nunjucks/context/context.js'
import { TbOriginSectionSummaryPageController } from './section-summary-controller.js'

// Form metadata
const now = new Date()
const user = { id: 'example-user', displayName: 'Example user' }

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
  teamName: 'Example team',
  teamEmail: 'example-team@defra.gov.uk',
  submissionGuidance: "Thanks for your submission, we'll be in touch",
  notificationEmail: 'example-email-submission-recipient@defra.com',
  ...author,
  live: author
}

const formsService = {
  /** @param {string} slug */
  getFormMetadata: function (slug) {
    switch (slug) {
      case tbOriginJourney.slug:
        return Promise.resolve(tbOriginJourney)
      default:
        throw Boom.notFound(`Form '${slug}' not found`)
    }
  },

  /** @param {string} id */
  getFormDefinition: async function (id) {
    switch (id) {
      case tbOriginJourney.id:
        return Promise.resolve(tbOriginJourneyDefinition)
      default:
        throw Boom.notFound(`Form '${id}' not found`)
    }
  }
}

const formSubmissionService = {
  async persistFiles() {},
  async submit() {
    return { message: 'submit successfully' }
  }
}

const outputService = {
  async submit() {}
}

export const services = { formsService, formSubmissionService, outputService }

export const defraFormsPluginOptions = {
  nunjucks: {
    paths: [
      path.resolve(
        config.get('root'),
        './src/server/common/templates'
      ),
      path.resolve(
        config.get('root'),
        './src/server/common/templates/layouts'
      ),
      path.resolve(
        config.get('root'),
        './src/server/common/templates/partials'
      ),
      path.resolve(config.get('root'), './src/server/common/components')
    ],
    baseLayoutPath: 'page.njk'
  },
  baseUrl: config.get('appBaseUrl'),
  viewContext: context,
  services,
  controllers: {
    TbOriginSectionSummaryPageController
  },
  filters: {}
}
