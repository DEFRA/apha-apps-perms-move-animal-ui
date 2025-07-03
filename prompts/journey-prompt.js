export const journeyPrompt = {
  type: 'list',
  name: 'journey',
  message: (answers) =>
    `What \x1b[33mjourney\x1b[0m are you adding this ${answers.questionType} question to?`,
  choices: ['tb', 'exotics']
}
