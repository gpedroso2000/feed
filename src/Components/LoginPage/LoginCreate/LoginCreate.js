import React from 'react'
import Input from '../../Input/Input'
import Button from '../../Button/Button'
import useForm from '../../../Hooks/useForm'
import styles from './LoginCreate.module.css'
import { UserContext } from '../../../Context/UserContext'

const LoginCreate = () => {
  const { userCreate, loading } = React.useContext(UserContext)
  const username = useForm()
  const password = useForm()

  function handleSubmit(event) {
    event.preventDefault()
    userCreate(username.value, password.value)
  }

  return (
    <section className={styles.sectionCreate}>
      <h1 className="title">Create Account</h1>
      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        <Input label="Password" type="password" name="password" {...password} />
        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button>Sign-up</Button>
        )}
      </form>
    </section>
  )
}

export default LoginCreate
