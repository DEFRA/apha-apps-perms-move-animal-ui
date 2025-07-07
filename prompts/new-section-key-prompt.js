export const newSectionKeyPrompt = {
  type: 'input',
  name: 'sectionKey',
  message: (answers) =>
    `What is the \x1b[33msection key\x1b[0m of  the new ${answers.journey} section?`,
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'Question text cannot be empty.'
    }
    return true
  }
}
