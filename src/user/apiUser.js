export const read = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
    method: 'GET',
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}

export const update = (userId, token, user) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: user
  })
  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
};


export const remove = (userId, token) => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })

  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}


export const list = () => {
  return fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
    method: 'GET',
  })

  .then(response => {
    return response.json();
  })
  .catch(err => console.log(err))
}