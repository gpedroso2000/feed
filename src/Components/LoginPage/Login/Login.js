import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginCreate from '../LoginCreate/LoginCreate'
import LoginForgot from '../LoginForgot/LoginForgot'
import LoginForm from '../LoginForm/LoginForm'
import styles from './Login.module.css'

const Login = () => {
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />}></Route>
          <Route path="create" element={<LoginCreate />}></Route>
          <Route path="forgot" element={<LoginForgot />}></Route>
        </Routes>
      </div>
    </section>
  )
}

export default Login
