const loginController = {
  options: {
    auth: 'defra-id'
  },
  handler: (_request, h) => {
    return h.redirect('/')
  }
}

export { loginController }
