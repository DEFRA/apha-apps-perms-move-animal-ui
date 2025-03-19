const loginController = {
  options: {
    auth: 'defra-id'
  },
  handler: (request, h) => h.redirect('/')
}

export { loginController }
