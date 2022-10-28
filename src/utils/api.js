export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    // метод проверки статуса ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`) //ПРОМИС - ОБЕЩАНИЕ
    }

    // метод получения initialCards с сервера
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // метол получения данных пользователя с сервера
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // метод добавления карточки //card
    addCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // метод удаления карточки
    delCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // метод изменения лайка карточки
    changeLikeCardStatus(cardID, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // метод добавления лайка карточке
    /*        setLikeCard(cardID)
            {
                return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
                    method: 'PUT',
                    headers: this._headers
                })
                    .then(res => {
                        return this._checkResponse(res)
                    });
            }*/

    /*  // метод удаления лайка у карточки
      delLikeCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
          method: 'DELETE',
          headers: this._headers
        })
          .then(res => {
            return this._checkResponse(res)
          });
      }*/


    // метод изменения данных пользователя
    changeUserData(data) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.username,
                about: data.job
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // метод обновления аватара пользователя
    updateAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }
}

/*++++++++++++++++++++API+++++++++++++++++++++++*/
const
    api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
        headers: {
            authorization: '3da86922-f76f-47f7-81bc-c1b3b90197e4',
            'Content-Type': 'application/json'
        }
    });

export default api;