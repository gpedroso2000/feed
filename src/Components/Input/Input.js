import React from 'react'
import styles from './Input.module.css'

const Input = ({ name, label, type, value, onChange, disabled }) => {
  return (
    <div className={styles.divInput}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        value={value}
        type={type}
        onChange={onChange}
        className={styles.input}
        disabled={disabled}
      />
    </div>
  )
}

export default Input
