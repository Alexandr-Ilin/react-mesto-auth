const BASE_URL = "https://auth.nomoreparties.co";

const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
  
    return res.json()
    .then((err) => {
      throw err;
    })
}

export const register = ({password, email}) => {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
}

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(checkResponse)
};

export const checkToken  = (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${jwt}`
    }})
  .then(checkResponse)
}