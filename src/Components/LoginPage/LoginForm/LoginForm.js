import React from 'react'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import useForm from '../../../Hooks/useForm'
import { Link } from 'react-router-dom'
import styles from './LoginForm.module.css'
import { UserContext } from '../../../Context/UserContext'

const LoginForm = () => {
  const { userLogin, loading } = React.useContext(UserContext)
  const username = useForm()
  const password = useForm()

  function handleSubmit(event) {
    event.preventDefault()
    userLogin(username.value, password.value)
  }

  return (
    <section className={styles.sectionLogin}>
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button>Sign-in</Button>
        )}
      </form>
      <Link className={styles.forgot} to="/login/forgot">
        Do you forgot your password ?
      </Link>
      <div>
        <Link className={styles.create} to="/login/create">
          Create account
        </Link>
      </div>
    </section>
  )
}

export default LoginForm
