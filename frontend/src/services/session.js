const session = {
  setToken(token) {
    localStorage.setItem('@token', token)
    return Promise.resolve(token)
  },
  getBearerToken() {
    const token = localStorage.getItem('@token')
    return Promise.resolve(`Bearer ${token}`)
  }
}

export default session
