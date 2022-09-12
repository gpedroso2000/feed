import React from 'react'
import Posts from '../Posts/Posts'
import UserContext from '../../Context/UserContext'

const Feed = () => {
  const { login } = React.useContext(UserContext)

  if (login === null) {
    window.location.pathname = '/login'
  } else {
    return <Posts />
  }
}

export default Feed
