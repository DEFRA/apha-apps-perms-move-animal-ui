const postLogoutController = {
  options: {
    auth: false
  },
  handler: (_request, h) => {
    return h.redirect('/')
  }
}

export { postLogoutController }
