import React from 'react'
import { useNavigate } from 'react-router-dom'
import { USERLOGIN_POST, USERCREATE_POST, USERFORGOT_GET } from '../api'

export const UserContext = React.createContext()

export const UserStorage = ({ children }) => {
  const navigate = useNavigate()
  const [token, setToken] = React.useState(null)
  const [login, setLogin] = React.useState(null)
  const [loading, setLoading] = React.useState(false)

  async function userLogin(username, password) {
    setLoading(true)
    if (username.length <= 0) {
      alert('User is required!')
      setLoading(false)
      return
    } else if (password.length <= 0) {
      alert('Password is required!')
      setLoading(false)
      return
    }
    const { url, options } = USERLOGIN_POST({ username, password })
    const response = await fetch(url, options)

    if (response.status === 401) {
      alert('User or Password are incorrect!')
      setLogin(false)
    } else {
      const json = await response.json()
      setLogin(true)
      setToken(json)
      navigate('/')
    }
    setLoading(false)
  }

  async function userCreate(username, password) {
    setLoading(true)
    if (username.length <= 0) {
      alert('User is required!')
      setLoading(false)
      return
    } else if (password.length <= 3) {
      alert('Password is required!')
      setLoading(false)
      return
    }
    const { url, options } = USERCREATE_POST({
      username: username,
      password: password
    })

    const response = await fetch(url, options)
    if (response.ok) {
      alert('Registered user successful!')
    } else {
      const json = await response.json()
      if (json.name == 'SequelizeUniqueConstraintError')
        alert('This user is already registered.')
    }
    setLoading(false)
  }

  async function userForgot(username) {
    let password = null

    setLoading(true)
    if (username.length <= 0) {
      alert('User is required!')
      setLoading(false)
      return
    }
    const { url, options } = USERFORGOT_GET(username)

    const response = await fetch(url, options)
    if (response.status === 200) {
      const json = await response.json()
      password = json.password
    } else if (response.status === 204) {
      alert("User don't finded.")
    }
    setLoading(false)
    return password
  }

  function userLogout() {
    setToken(null)
    setLogin(null)
    setLoading(false)
    navigate('/login')
  }

  return (
    <UserContext.Provider
      value={{
        userLogin,
        userLogout,
        userCreate,
        userForgot,
        loading,
        setLoading,
        login,
        token
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
