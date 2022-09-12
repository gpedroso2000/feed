import React from 'react'
import { POSTS_GET } from '../../api'
import UserContext from '../../Context/UserContext'
import Modal from '../Modal/Modal'
import Upvote from '../Upvote/Upvote'
import styles from './Posts.module.css'

const Posts = () => {
  const { token, userLogout } = React.useContext(UserContext)
  const [modal, setModal] = React.useState(false)
  const [posts, setPosts] = React.useState([])

  async function fetchPosts() {
    const { url, options } = POSTS_GET(token)
    const response = await fetch(url, options)
    const json = await response.json()
    setPosts(json)
  }

  React.useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={userLogout}>
          Exit
        </button>
        <ul>
          {posts &&
            posts.map(post => (
              <li key={post.id} className={styles.post}>
                <div>
                  <b>{post.author.username}: </b>
                  <span>{post.content}</span>
                </div>
                <div className={styles.upvotes}>
                  <Upvote post={post} fetchPosts={fetchPosts} />
                </div>
              </li>
            ))}
        </ul>
        <button className={styles.add} onClick={() => setModal(!modal)}>
          +
        </button>
      </div>
      {modal && <Modal setModal={setModal} fetchPosts={fetchPosts} />}
    </>
  )
}

export default Posts
