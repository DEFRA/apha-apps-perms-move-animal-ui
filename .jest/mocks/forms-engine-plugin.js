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

// Default export for the main plugin
export default {
  plugin: {
    name: 'forms-engine-plugin',
    register: jest.fn()
  }
}
