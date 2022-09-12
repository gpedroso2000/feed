export const API_URL = 'https://segware-book-api.segware.io/api'

export function USERLOGIN_POST(body) {
  return {
    url: API_URL + '/sign-in',
    options: {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export function USERCREATE_POST(body) {
  return {
    url: API_URL + '/sign-up',
    options: {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export function USERFORGOT_GET(username) {
  return {
    url: API_URL + `/forgot-password/${username}`,
    options: {
      method: 'GET'
    }
  }
}

export function POSTS_GET(token) {
  return {
    url: API_URL + `/feeds`,
    options: {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  }
}

export function POSTNEW_POST(token, body) {
  return {
    url: API_URL + `/feed`,
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}

export function REACTION_POST(token, body) {
  return {
    url: API_URL + `/reaction`,
    options: {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }
  }
}
