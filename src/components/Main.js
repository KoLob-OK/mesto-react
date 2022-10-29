import React from 'react';
import userDefaultAvatar from '../images/user-avatar.png';
import api from '../utils/api';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const currentUser = React.useContext(CurrentUserContext);
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
        <main className="content page__content">

            <section className="profile content__profile">
                <div className="profile__card">

                    <div className="profile__avatar">
                        <div className="profile__avatar-img"
                             style={{backgroundImage: `url(${currentUser.avatar || userDefaultAvatar})`}}>
                        </div>
                    </div>

                    <button className="profile__avatar-button"
                            type="button"
                            aria-label="Обновить аватар"
                            onClick={onEditAvatar}
                    />

                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={onEditProfile}
                        />
                        <p className="profile__description">{currentUser.about}</p>
                    </div>

                </div>
                <button className="profile__add-button"
                        type="button"
                        aria-label="Добавить фото"
                        onClick={onAddPlace}
                />
            </section>

            <section className="elements content__elements">
                <ul className="elements__list">
                    {cards.map(card => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={handleCardLike}
                                onCardDelete = {handleCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>

        </main>
    );
}

export default Main;