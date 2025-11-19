import {
  createAll,
  Button,
  Checkboxes,
  ErrorSummary,
  Header,
  Radios,
  SkipLink
} from 'govuk-frontend'
import accessibleAutocomplete from 'accessible-autocomplete'
import { initAll } from '@defra/forms-engine-plugin/shared.js'

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
  // Initialize accessible autocomplete if element exists
  const selectEl = document.querySelectorAll('div:has(>.autocomplete) select')

  selectEl.forEach((el) => {
    accessibleAutocomplete.enhanceSelectElement({
      minLength: 2,
      selectElement: el
    })
  })

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

initAll()
