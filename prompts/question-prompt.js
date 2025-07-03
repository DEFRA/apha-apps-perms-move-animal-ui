export const questionPrompt = {
  type: 'input',
  name: 'question',
  message: 'What is the \x1b[33mquestion text\x1b[0m of the new question?',
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'Question text cannot be empty.'
    }
    return true
  },
  transform: (input) => {
    const trimmed = input.trim()
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
    return capitalized.endsWith('?') ? capitalized : `${capitalized}?`
  }
}
