import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api
            .getUserData()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card);
    }

    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                />
                <Footer/>

                /попап добавления карточки
                <PopupWithForm
                    name="add-card"
                    title="Новое место"
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}>
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
                            required/>
                        <span id="name-error" className="form__input-error"/>

                        <input
                            className="form__input form__input_type_link"
                            type="url"
                            name="link"
                            id="link"
                            placeholder="Ссылка на картинку"
                            value=""
                            required
                        />
                        <span id="link-error" className="form__input-error"/>

                        <button className="form__submit" type="submit">Создать</button>

                    </fieldset>
                </PopupWithForm>

                /попап редактирования профиля-->
                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                />

                /попап обновления аватара профиля-->
                <PopupWithForm
                    name="update-avatar"
                    title="Обновить аватар"
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}>
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
                        <span id="avatar-error" className="form__input-error"/>
                        <button className="form__submit" type="submit">Сохранить</button>
                    </fieldset>
                </PopupWithForm>

                /попап подтверждения удаления карточки-->
                <PopupWithForm
                    name="del-card"
                    title="Вы уверены?"
                    isOpen={false}
                    onClose={closeAllPopups}>
                    <button className="form__submit" type="submit">Да</button>
                </PopupWithForm>

                /попап просмотра фото-->
                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;