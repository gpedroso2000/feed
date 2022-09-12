import React from 'react'
import styles from './Modal.module.css'
import UserContext from '../../Context/UserContext'
import { POSTNEW_POST } from '../../api'

const Modal = ({ setModal, fetchPosts }) => {
  const [comment, setComment] = React.useState('')
  const { token } = React.useContext(UserContext)

  function handleClick(event) {
    if (event.target.id === 'container') {
      setModal(false)
    }
  }

  async function addPost() {
    if (comment.length <= 0) {
      alert('Please, enter with a word!')
      return
    }

    const { url, options } = POSTNEW_POST(token, { content: comment })
    const response = await fetch(url, options)

    if (response.status === 201) {
      setComment('')
      await fetchPosts()
    } else {
      alert('Error Post')
    }
  }

  return (
    <div id="container" className={styles.container} onClick={handleClick}>
      <div className={styles.modal}>
        <textarea
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          className={styles.textarea}
        />
        <button className={styles.button} onClick={addPost}>
          Post
        </button>
      </div>
    </div>
  )
}

export default Modal
