export default function (plop) {
  // controller generator
  plop.setGenerator('question-page', {
    description: 'create a skeleton question page',
    prompts: [
      {
        type: 'input',
        name: 'urlPath',
        message: 'url path'
      },
      {
        type: 'input',
        name: 'question',
        message: 'question'
      },
      {
        type: 'input',
        name: 'questionKey',
        message: 'question key (e.g. typeOfAnimal)'
      },
      {
        type: 'input',
        name: 'sectionKey (e.g. about)',
        message: 'section key'
      },
      {
        type: 'input',
        name: 'pageName',
        message: 'page name (e.g. typeOfAnimal)'
      },
      {
        type: 'input',
        name: 'journey',
        message: 'journey name (e.g. Exotics or Tb)'
      }
    ],
    actions: [
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase pageName}}/index.js',
        templateFile: 'templates/question/question.hbs'
      },
      {
        type: 'add',
        path: 'src/server/{{camelCase journey}}/{{sectionKey}}/{{kebabCase pageName}}/index.test.js',
        templateFile: 'templates/question/question.test.hbs'
      }
    ]
  })
}
