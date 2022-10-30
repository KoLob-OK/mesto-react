import React from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DelConfirmPopup from './DelConfirmPopup';

import CurrentUserContext from '../contexts/CurrentUserContext';

import api from '../utils/api';

function App() {
    // Задаем переменную состояния попапов
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    // Задаем выбранную для просмотра карточку
    const [selectedCard, setSelectedCard] = React.useState({});
    // Задаем выбранную для удаления карточку
    const [selectedForDelCard, setSelectedForDelCard] = React.useState(false);
    // Текущий пользователь
    const [currentUser, setCurrentUser] = React.useState({});
    // Массив карточек
    const [cards, setCards] = React.useState([]);


    // Используем эффект для получения массива с начальными карточками и данных пользователя
    React.useEffect(() => {
        api
            .getInitialCards()
            .then(initialCards => {
                setCards(initialCards);
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке картинок: ${err}`);
            });

        api
            .getUserData()
            .then(userData => {
                setCurrentUser(userData);
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке данных пользователя: ${err}`);
            });
    }, []);

    // Обработчик клика аватара (открывание EditAvatarPopup)
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    // Обработчик клика кнопки редактирования профиля (открывание EditProfilePopup)
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    // Обработчик клика кнопки "+" (открывание AddPlacePopup)
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    // Обработчик клика по картинке (открывание ImagePopup)
    function handleCardClick(card) {
        setSelectedCard(card);
    }

    // Функция закрытия попапов
    function closeAllPopups() {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
        setSelectedForDelCard(false);
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

    // Функция-обработчик добавления карточки
    function handleAddPlaceSubmit(newPlace) {
        api
            .addCard(newPlace)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => {
                console.log(`Произошла ошибка при загрузке картинки: ${err}`);
            });
    }

    // Функция-обработчик удаления карточки (открывание DelConfirmPopup)
    function handleCardDelete(card) {
        setSelectedForDelCard(card);
    }

    // Функция-обработчик подтверждения удаления карточки
    function handleConfirmDel() {
        api
            .delCard(selectedForDelCard)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== selectedForDelCard));
                closeAllPopups();
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
                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                />

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
                <DelConfirmPopup
                    card={selectedForDelCard}
                    onClose={closeAllPopups}
                    onConfirm={handleConfirmDel}
                />

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