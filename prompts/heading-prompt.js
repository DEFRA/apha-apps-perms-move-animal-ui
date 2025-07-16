export const headingPrompt = {
  type: 'input',
  name: 'heading',
  message: 'What is the \x1b[33mheading\x1b[0m of the new page?',
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'Heading text cannot be empty.'
    }
    return true
  },
  transform: (input) => {
    const trimmed = input.trim()
    const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
    return capitalized.endsWith('?') ? capitalized : `${capitalized}?`
  }
}
