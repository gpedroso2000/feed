import React from 'react'
import { REACTION_POST } from '../../api'
import UserContext from '../../Context/UserContext'
import styles from './Upvote.module.css'

const urlLike =
  'https://img.icons8.com/external-kmg-design-glyph-kmg-design/32/000000/external-like-feedback-kmg-design-glyph-kmg-design.png'

const urlLikeActive =
  'https://img.icons8.com/external-kmg-design-flat-kmg-design/32/000000/external-like-feedback-kmg-design-flat-kmg-design.png'

const urlLove = 'https://img.icons8.com/tiny-glyph/16/000000/like.png'

const urlLoveActive = 'https://img.icons8.com/tiny-color/16/000000/like.png'

const Upvote = ({ post, fetchPosts }) => {
  const { token } = React.useContext(UserContext)
  const [like, setLike] = React.useState({})
  const [love, setLove] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  async function handleClick(event) {
    setLoading(true)
    if (event.target.id === 'love') {
      if (love.active === 1) {
        setLove({ id: love.id, active: 0, cont: love.cont - 1 })
      } else {
        setLove({ id: love.id, active: 1, cont: love.cont + 1 })
      }
      await postReaction('love')
    } else if (event.target.id === 'like') {
      if (like.active === 1) {
        setLike({ id: like.id, active: 0, cont: like.cont - 1 })
      } else {
        setLike({ id: like.id, active: 1, cont: like.cont + 1 })
      }
      await postReaction('like')
    }
  }

  async function postReaction(reaction) {
    var body = {}
    if (reaction === 'love') {
      body = {
        feedId: love.id,
        like: like.active,
        love: love.active === 0 ? 1 : 0
      }
    } else {
      body = {
        feedId: like.id,
        like: like.active === 0 ? 1 : 0,
        love: love.active
      }
    }

    const { url, options } = REACTION_POST(token, body)
    const response = await fetch(url, options)
    if (response.status !== 200) {
      alert('Error')
    }

    await fetchPosts()
    setLoading(false)
  }

  React.useEffect(() => {
    setLike({ id: post.id, active: post.activeUserLikedIt, cont: post.likes })
    setLove({ id: post.id, active: post.activeUserLovedIt, cont: post.loves })
  }, [post])

  return (
    <>
      <div className={styles.containerUpvote}>
        <img
          id="like"
          className={`${loading && styles.active}`}
          src={like.active > 0 ? urlLikeActive : urlLike}
          alt="icon like"
          onClick={handleClick}
        />
        <span className={styles.cont}>{like.cont}</span>
      </div>
      <div className={styles.containerUpvote}>
        <img
          id="love"
          className={`${loading && styles.active}`}
          src={love.active > 0 ? urlLoveActive : urlLove}
          alt="icon love"
          onClick={handleClick}
        />
        <span className={styles.cont}>{love.cont}</span>
      </div>
    </>
  )
}

export default Upvote
