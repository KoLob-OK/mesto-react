import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
    }

  return (
    <body className="page">
      <Header />
      <Main onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
      />
      <Footer />

      /попап добавления карточки-->
      <PopupWithForm
          name="add-card"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          children={(
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
          )}
      />

      /попап редактирования профиля-->
      <PopupWithForm
          name="profile-edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          children={(
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
          )}
      />

      /попап обновления аватара профиля-->
      <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          children={(
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
          )}
      />

      /попап подтверждения удаления карточки-->
      <PopupWithForm
          name="del-card"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
          children={(
              <button className="form__submit" type="submit">Да</button>
          )}
      />

      /попап просмотра фото-->
      <ImagePopup />

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
