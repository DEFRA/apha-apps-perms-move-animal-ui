export const radioChoicePrompt = {
  type: 'input',
  name: 'choices',
  message: 'Enter radio options separated by commas (e.g. "Yes, No, Maybe"):',
  when: (answers) => answers.questionType === 'radio-button',
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'You must enter at least one choice.'
    }
    return true
  },
  transform: (input) => {
    return input
      .split(',')
      .map((choice) => choice.trim())
      .filter((choice) => choice.length > 0)
  }
}
