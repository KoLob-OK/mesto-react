import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';


function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    // Используем эффект для получения массива с карточками
    React.useEffect(() => {
        api
            .getInitialCards()
            .then(data => {
                setCards(data);
            })
            .catch(err => {
                console.log(`Ошибка загрузки картинок: ${err}`);
            });
    }, []);

    React.useEffect(() => {
        api
            .getUserData()
            .then(data => {
                setCurrentUser(data);
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке данных пользователя: ${err}`);
            });
    }, []);

    // Обработчик клика аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    // Обработчик клика кнопки редактирования профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    // Обработчик клика кнопки "+"
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    // Обработчик клика по картинке
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    // Функция закрытия попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    }

    // Обработчик отправки данных пользователя
    function handleUpdateUser(userData) {
        api
            .changeUserData(userData)
            .then(newData => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при изменении данных пользователя: ${err}`);
            });
    }

    // Обработчик отправки данных аватара
    function handleUpdateAvatar(userAvatar) {
        api
            .updateAvatar(userAvatar)
            .then(newData => {
                setCurrentUser(newData);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при обновлении аватара: ${err}`);
            });
    }

    // Функция-обработчик изменения лайка
    function handleCardLike(card) {
        // Объявляем переменную "Есть Лайк" (isLiked) - проверяем, есть ли уже мой лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Делаем запрос на сервер
        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                // Перебором по массиву методом map проверяем, есть ли лайк у карточки
                // (если id карточки в стейте (card) точно равен id карточки из массива c сервера (newCard),
                // то лайк есть, создаем newCard... иначе следующая карточка без лайка)
                setCards((cards) => cards.map((card) => card._id === newCard._id ? newCard : card));
            })
            .catch(err => {
                console.log(`Произошла ошибка при изменении лайка: ${err}`);
            });
    }

    // Функция-обработчик удаления карточки
    function handleCardDelete(cardID) {

        api
            .delCard(cardID)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== cardID));
            })
            .catch(err => {
                console.log(`Произошла ошибка при удалении картинки: ${err}`);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header/>
                <Main
                    cards={cards}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
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
                    onUpdateUser={handleUpdateUser}
                />

                /попап обновления аватара профиля-->
                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

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