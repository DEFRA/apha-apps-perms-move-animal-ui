export const sectionTitlePrompt = {
  type: 'input',
  name: 'sectionTitle',
  message: (answers) =>
    `What is the \x1b[33msection title\x1b[0m of ${answers.journey} you are adding?`,
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'Question text cannot be empty.'
    }
    return true
  }
}
