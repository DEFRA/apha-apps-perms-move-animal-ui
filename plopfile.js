import path from 'node:path'

export default function (plop) {
  plop.setHelper('camelCase', (text) => {
    const camelCased = text.replace(/-([a-z])/g, (match, letter) =>
      letter.toUpperCase()
    )
    return camelCased.charAt(0).toUpperCase() + camelCased.slice(1)
  })

  plop.setHelper('upperFirst', (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1)
  })

  plop.setHelper('lowerFirst', (text) => {
    return text.charAt(0).toLowerCase() + text.slice(1)
  })

  plop.setGenerator('Question page', {
    description: 'This will create a question page',
    prompts: [
      {
        type: 'input',
        name: 'sectionKey',
        message: 'Section key (eg. origin)'
      },
      {
        type: 'input',
        name: 'questionKey',
        message: 'Question key (eg. cphNumber)'
      },
      {
        type: 'input',
        name: 'question',
        message: 'Question text?'
      },
      {
        type: 'list',
        name: 'questionType',
        message: 'Question type',
        choices: ['text', 'text-area', 'radio', 'checkbox']
      },
      {
        type: 'input',
        name: 'path',
        message: 'page URL'
      },
      {
        type: 'input',
        name: 'className',
        message: 'What is the base of the class name(s)?'
      }
    ],
    actions: [
      {
        type: 'add',
        path:
          path.relative(plop.getPlopfilePath(), process.cwd()) +
          '/{{questionKey}}/index.js',
        templateFile: 'templates/question-page/index.js.hbs'
      }
    ]
  })
}
