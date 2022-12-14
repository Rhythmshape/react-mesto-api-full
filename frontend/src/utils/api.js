class Api {
  constructor(options) {
    this._serverUrl = options.serverUrl;
    this._headers = options.headers;
  }
  //получить ответ с сервера
  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
  _getHeaders() {
    const jwt = localStorage.getItem('jwt');
    return {
      'Authorization': `Bearer ${jwt}`,
      ...this._headers,
    };
  }
  //Загрузить информацию о пользователе с нужного сервера
  getUserInfoApi() {
    return fetch(`${this._serverUrl}/users/me`, {
      headers: this._getHeaders(),
    })
      .then(this._getResponseData);
  }

  //Отредактировать профиль пользователя (имя/описание)
  editPageUserInfo(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ name: data.name,
        about: data.about, })
    })
      .then(this._getResponseData);
  }
  //Обновить аватар пользователя на странице
  editUserAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ 
        avatar: data.avatar,
      })
    })
      .then(this._getResponseData);
  }

  //Загрузить исходные карточки с сервера
  getInitialCards() {
    return fetch(`${this._serverUrl}/cards`, {
      headers: this._getHeaders(),
    })
      .then(this._getResponseData);
  }

  //Добавить новую карточку
  addCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({ 
        name:data.name,
        link:data.link
      })
    })
      .then(this._getResponseData);
  }

  //Удалить карточку
  deleteCard(card) {
    return fetch(`${this._serverUrl}/cards/${card._id}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._getResponseData);
  }

  //Поставить лайк карточке
  addLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    })
      .then(this._getResponseData);
  }

  //Убрать лайк
  removeLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    })
      .then(this._getResponseData);
  }
}

const api = new Api({
  serverUrl: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json'
  }
});


export default api;

