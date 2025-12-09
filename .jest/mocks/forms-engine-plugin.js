/**
 * Mock for @defra/forms-engine-plugin
 */

export class QuestionPageController {
  constructor(model, pageDef) {
    this.model = model
    this.pageDef = pageDef || {}
    this.viewModel = {}
  }

  getSummaryPath() {
    return '/summary'
  }

  handleSaveAndExit() {
    return {}
  }
}

export const FormAction = {
  SaveAndExit: 'save-and-exit',
  Continue: 'continue',
  AddAnother: 'add-another',
  External: 'external'
}

export const proceed = jest.fn()
export const getCacheService = jest.fn()
export const evaluateTemplate = jest.fn()
export const getAnswer = jest.fn()

export class FormModel {
  constructor(definition, options, services, controllers) {
    this.definition = definition
    this.options = options
    this.services = services
    this.controllers = controllers
  }

  getFormContext(_request, state, errors) {
    return {
      pages: [],
      relevantPages: [],
      answers: {},
      errors: errors || [],
      state
    }
  }
}

export class TerminalPageController {}

// Default export for the main plugin
export default {
  plugin: {
    name: 'forms-engine-plugin',
    register: jest.fn()
  }
}
