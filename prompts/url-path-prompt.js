export const urlPathPrompt = {
  type: 'input',
  name: 'path',
  message: 'What is the \x1b[33murl path\x1b[0m of the new question?',
  validate: (input) => {
    if (!input || input.trim() === '') {
      return 'URL path cannot be empty.'
    }
    return true
  },
  transform: (input) => {
    const trimmed = input.trim()
    const urlFriendly = trimmed
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-_/]/g, '')
    return urlFriendly.startsWith('/') ? urlFriendly : `/${urlFriendly}`
  }
}
