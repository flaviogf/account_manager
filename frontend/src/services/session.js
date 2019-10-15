const session = {
  setToken(token) {
    localStorage.setItem('@token', token)
    return Promise.resolve(token)
  },
  getBearerToken() {
    const token = localStorage.getItem('@token')
    return Promise.resolve(`Bearer ${token}`)
  },
  isAuthenticated() {
    return !!localStorage.getItem('@token')
  }
}

export default session
