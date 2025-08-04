import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink
} from 'govuk-frontend'

createAll(Button)
createAll(Checkboxes)
createAll(ErrorSummary)
createAll(Header)
createAll(Radios)
createAll(SkipLink)

document.getElementById('back-link')?.addEventListener('click', function (e) {
  e.preventDefault()
  window.history.back()
})

document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('form')
  forms.forEach((form) => {
    form.addEventListener('submit', function () {
      if (window.location.hash) {
        window.history.replaceState(
          null,
          '',
          window.location.pathname + window.location.search
        )
      }
    })
  })
})
