const session = {
  setToken(token) {
    sessionStorage.setItem('@token', token)
    return Promise.resolve(token)
  },
  getBearerToken() {
    const token = sessionStorage.getItem('@token')
    return Promise.resolve(`Bearer ${token}`)
  },
  isAuthenticated() {
    return !!sessionStorage.getItem('@token')
  }
}

export default session
