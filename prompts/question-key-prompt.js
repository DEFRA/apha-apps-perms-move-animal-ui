export const questionKeyPrompt = {
  type: 'input',
  name: 'questionKey',
  message: 'What is the \x1b[33mquestion key\x1b[0m of the new question?',
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'Question key cannot be empty.'
    }
    if (!/^[a-zA-Z]+$/.test(input)) {
      return 'Question key must contain only letters.'
    }
    return true
  },
  transform: (input) => input.trim()
}
