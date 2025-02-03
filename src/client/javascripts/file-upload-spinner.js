document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form') // Adjust the selector to target your specific form
  const uploadSpinner = document.querySelector('form ~ .apha_upload-spinner')

  if (uploadSpinner) {
    uploadSpinner.style.display = 'none'
  }

  if (form && uploadSpinner) {
    form.addEventListener('submit', (e) => {
      document
        .querySelectorAll('.govuk-main-wrapper > *:not(.apha_upload-spinner)')
        .forEach((el) => (el.style.display = 'none'))
      uploadSpinner.style.display = 'block'
      return false
    })
  }
})
