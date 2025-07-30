import Boom from '@hapi/boom'
import { typeOfBirdOtherPage } from '~/src/server/exotics/about/type-of-bird-other/index.js'
import { TextInputPage } from './text-input-page.js'

/** @import { ComponentDef, ComponentType, PageQuestion } from '@defra/forms-model' */
/** @import { QuestionPage } from '../../model/page/question-page-model.js' */

// Form metadata
const now = new Date()
const user = { id: 'example-user', displayName: 'Example user' }

/**
 * @param {QuestionPage} page
 * @returns {PageQuestion}
 **/
const page = (page) => ({
  path: page.urlPath,
  title: page.question,
  components: [component(page)],
  section: page.sectionKey,
  next: page.defraFormsNextPage()
})

/**
 * @param {QuestionPage} page
 * @returns {ComponentDef}
 **/
const component = (page) => ({
  name: page.questionKey,
  title: page.question,
  ...page.Answer.defraFormsOptions()
})

const author = {
  createdAt: now,
  createdBy: user,
  updatedAt: now,
  updatedBy: user
}

const metadata = {
  id: '48158770-647d-4fde-a3c5-1fc1e28f780d',
  slug: 'example-form',
  title: 'Example form',
  organisation: 'Defra',
  teamName: 'Example team',
  teamEmail: 'example-team@defra.gov.uk',
  submissionGuidance: "Thanks for your submission, we'll be in touch",
  notificationEmail: 'example-email-submission-recipient@defra.com',
  ...author,
  live: author
}

const definition = {
  engine: 'V2',
  name: 'Example form',
  pages: [
    {
      title: 'Start page',
      path: '/start',
      controller: 'StartPageController',
      components: [
        {
          name: 'Jhimsh',
          title: 'Html',
          type: 'Html',
          content: '<p class="govuk-body">Example</p>',
          options: {},
          schema: {}
        }
      ]
    },
    page(new TextInputPage()),
    {
      path: '/full-name',
      title: 'Enter your full name',
      components: [
        {
          name: 'sdrGvs',
          title: 'Full name',
          type: 'TextField',
          options: {},
          schema: {}
        }
      ]
    },
    {
      path: '/summary',
      title: 'Check your answers',
      controller: 'SummaryPageController'
    }
  ],
  lists: [],
  sections: [],
  conditions: []
}

const formsService = {
  getFormMetadata: function (slug) {
    switch (slug) {
      case metadata.slug:
        return Promise.resolve(metadata)
      default:
        throw Boom.notFound(`Form '${slug}' not found`)
    }
  },
  getFormDefinition: function (id) {
    switch (id) {
      case metadata.id:
        return Promise.resolve(definition)
      default:
        throw Boom.notFound(`Form '${id}' not found`)
    }
  }
}

export default { formsService }
