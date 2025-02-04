// sonarignore
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form')
  const uploadSpinner = document.querySelector('form ~ .apha_upload-spinner')

  if (uploadSpinner) {
    uploadSpinner.classList.add('apha-hidden')
  }

  if (form && uploadSpinner) {
    form.addEventListener('submit', () => {
      document
        .querySelectorAll('.govuk-main-wrapper > *:not(.apha_upload-spinner)')
        .forEach((el) => el.classList.add('apha-hidden'))
      uploadSpinner.classList.toggle('apha-block')
      return false
    })
  }
})
