import React from 'react';
import Header from './Header';
import Main from "./Main";
import Footer from './Footer';
import userDefaultAvatar from '../images/user-avatar.png';

function App() {
  return (
    <body className="page">
      <Header />
      <Main />
      <Footer />

      /попап добавления карточки-->
      <div className="popup popup_type_add-card">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть окно"></button>
          <h2 className="popup__title">Новое место</h2>
          <form name="add-card-form" method="GET" action="#" className="form popup__form" noValidate>
            <fieldset className="form__set">

              <input
                  className="form__input form__input_type_name"
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Название"
                  minLength="2"
                  maxLength="30"
                  value=""
                  required />
                <span id="name-error" className="form__input-error"></span>

                <input
                    className="form__input form__input_type_link"
                    type="url"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    value=""
                    required
                />
                  <span id="link-error" className="form__input-error"></span>

                  <button className="form__submit" type="submit">Создать</button>

            </fieldset>
          </form>
        </div>
      </div>

      /попап редактирования профиля-->
      <div className="popup popup_type_profile-edit">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть окно"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
          <form name="profile-edit-form" action="#" className="form popup__form" noValidate>
            <fieldset className="form__set">

              <input
                  className="form__input form__input_type_username"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Имя"
                  minLength="2"
                  maxLength="40"
                  value=""
                  required
              />
                <span id="username-error" className="form__input-error"></span>

                <input
                    className="form__input form__input_type_job"
                    type="text"
                    name="job"
                    id="job"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    value=""
                    required
                />
                  <span id="job-error" className="form__input-error"></span>

                  <button className="form__submit" type="submit">Сохранить</button>

            </fieldset>
          </form>
        </div>
      </div>

      /попап обновления аватара профиля-->
      <div className="popup popup_type_update-avatar">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть окно"></button>
          <h3 className="popup__title">Обновить аватар</h3>
          <form name="avatar-update-form" action="#" className="form popup__form" noValidate>
            <fieldset className="form__set">
              <input
                  className="form__input form__input_type_avatar"
                  type="url"
                  name="avatar"
                  id="avatar"
                  placeholder="Ссылка на картинку"
                  value=""
                  required
              />
                <span id="avatar-error" className="form__input-error"></span>
                <button className="form__submit" type="submit">Сохранить</button>
            </fieldset>
          </form>
        </div>
      </div>

      /попап просмотра фото-->
      <div className="popup popup_type_expand-image">
        <div className="popup__image-container">
          <button type="button" className="popup__close" aria-label="Закрыть окно"></button>
          <figure className="popup__figure">
            <img className="popup__image"
                 src=""
                 alt=""
            />
            <figcaption className="popup__caption"></figcaption>
          </figure>
        </div>
      </div>

      /попап подтверждения удаления карточки-->
      <div className="popup popup_type_del-card">
        <div className="popup__container">
          <button type="button" className="popup__close" aria-label="Закрыть окно"></button>
          <h2 className="popup__title">Вы уверены?</h2>
          <form name="del-card-form" action="#" className="form popup__form" noValidate>
            <button className="form__submit" type="submit">Да</button>
          </form>
        </div>
      </div>

      /элемент карточки-->
      <template className="element-tmp">
        <li className="element">
          <img className="element__image"
               src=""
               alt=""
          />
          <div className="element__wrapper">
            <h2 className="element__title"></h2>
            <div className="element__likes">
              <button className="element__like-button"
                      type="button"
                      aria-label="Нравится">
              </button>
              <span className="element__likes-counter"></span>
            </div>
          </div>
          <button className="element__del-button"
                  type="button"
                  aria-label="Удалить">
          </button>
        </li>
      </template>

      </body>
  );
}

export default App;
