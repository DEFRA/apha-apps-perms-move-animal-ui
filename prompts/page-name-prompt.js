export const pageNamePrompt = {
  type: 'input',
  name: 'pageName',
  message: 'What is the \x1b[33mpage name\x1b[0m of the new page?',
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'Page name cannot be empty.'
    }
    if (!/^[a-zA-Z]+$/.test(input)) {
      return 'Page name must contain only letters.'
    }
    return true
  },
  transform: (input) => input.trim()
}
