export const questionTypePrompt = {
  type: 'list',
  name: 'questionType',
  message: 'What \x1b[33mtype\x1b[0m of question are you adding?',
  choices: [
    'checkbox',
    'number',
    'radio-button',
    'text',
    'text-area',
    'date',
    'full-name',
    'address',
    'email-address'
  ]
}
