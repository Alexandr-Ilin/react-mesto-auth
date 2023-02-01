class Api {
  constructor({
    baseUrl,
    headers
  }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._avaUrl = `${this._baseUrl}/users/me/avatar`;
    this._cardsUrl = `${this._baseUrl}/cards`;
    this._likesUrl = `${this._baseUrl}/cards/likes`;
    this._headers = headers
  }

  //получение информации о пользователе с сервера
  getUserData() {
    return fetch(this._userUrl, {
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  //получение карточек с сервера
  getInitialCards() {
    return fetch(this._cardsUrl, {
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  //отправка данных пользователя на сервер
  changeUserData({ user, character }) {
    return fetch(this._userUrl, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: user,
          about: character,
        })
      })
      .then(this._checkResponse)
  }

  //добавлениt новой карточки на сервер
  addNewCard({ name, link }) {
    return fetch(this._cardsUrl, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          link: link,
        })
      })
      .then(this._checkResponse)
  }

  //удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._cardsUrl}/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isNotLiked) {
    if (isNotLiked) {
  //ставить лайк
      return fetch(`${this._likesUrl}/${cardId}`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._checkResponse)
    }
    //удалить лайк
    return fetch(`${this._likesUrl}/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  //смена аватара
  chengeAvatar(avatar) {
    return fetch(this._avaUrl, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(avatar),
      })
      .then(this._checkResponse)
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const api = new Api({
  baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    // authorization: 'a251447a-ca8d-48d6-88cb-4cedc8f5baae',
    'Content-Type': 'application/json'
  }
});
