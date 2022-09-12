import React from 'react'
import UserContext from '../../../Context/UserContext'
import useForm from '../../../Hooks/useForm'
import Button from '../../Button/Button'
import Input from '../../Input/Input'
import styles from './LoginForgot.module.css'

const LoginForgot = () => {
  const { loading, userForgot } = React.useContext(UserContext)
  const username = useForm()
  const password = useForm()

  async function handleSubmit(event) {
    event.preventDefault()
    let passForgot = await userForgot(username.value)
    password.setValue(passForgot)
  }

  return (
    <section className={styles.sectionForgot}>
      <h1 className="title">Recover Password</h1>
      <form onSubmit={handleSubmit}>
        <Input label="User" type="text" name="username" {...username} />
        {password.value && (
          <Input
            label="Password"
            type="text"
            name="password"
            {...password}
            disabled="disabled"
          />
        )}

        {loading ? (
          <Button disabled>Loading...</Button>
        ) : (
          <Button>Recover</Button>
        )}
      </form>
    </section>
  )
}

export default LoginForgot
