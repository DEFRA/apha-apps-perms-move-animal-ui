const loginController = {
  options: {
    auth: 'defra-id'
  },
  handler: (request, h) => {
    return h.redirect('/')
  }
}

export { loginController }
