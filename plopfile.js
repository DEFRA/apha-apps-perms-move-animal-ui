import glob from 'glob'

export default function (plop) {
  plop.setGenerator('Question page', {
    description: 'This will create a question page',
    prompts: [
      {
        type: 'list',
        name: 'journey',
        message: 'Journey type',
        choices: ['tb', 'exotics']
      },
      {
        type: 'list',
        name: 'sectionKey',
        message: 'Section key',
        choices: (answers) => {
          const sectionFiles = glob.sync(
            `src/server/${answers.journey}/*/section.js`
          )

          const sectionKeys = sectionFiles.map((file) => {
            const parts = file.split('/')
            return parts[parts.length - 2]
          })

          return sectionKeys.length > 0 ? sectionKeys : ['about']
        }
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
        message: 'Page URL'
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
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase className}}/index.js',
        templateFile: 'templates/question-page/index.js.hbs'
      },
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase className}}/index.test.js',
        templateFile: 'templates/question-page/index.test.js.hbs'
      }
    ]
  })
}
