import React from 'react';
import userDefaultAvatar from "../images/user-avatar.png";
import api from "../utils/api";
// import {selectors} from "../utils/constants";

function Main(props) {
    const [userAvatar, setUserAvatar] = React.useState();
    const [userName, setUserName] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api
            .getUserData()
            .then(data => {
                setUserAvatar(data.avatar);
                setUserName(data.name);
                setUserDescription(data.about);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });

        api
            .getInitialCards()
            .then(data => {
                setCards(data);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    return (
        <main className="content page__content">

            <section className="profile content__profile">
                <div className="profile__card">

                    <div className="profile__avatar">
                        <div className="profile__avatar-img"
                             style={{ backgroundImage: `url(${userAvatar || userDefaultAvatar})`}}>
                        </div>
                    </div>

                    <button className="profile__avatar-button"
                            type="button"
                            aria-label="Обновить аватар"
                            onClick={props.onEditAvatar}>
                    </button>


                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={props.onEditProfile}>
                        </button>
                        <p className="profile__description">{userDescription}</p>
                    </div>

                </div>
                <button className="profile__add-button"
                        type="button"
                        aria-label="Добавить фото"
                        onClick={props.onAddPlace}>
                </button>
            </section>

            <section className="elements content__elements">
                <ul className="elements__list">
                    {cards.map(card => {
                        return (
                            <li className="element"
                                key={card._id}>
                                <div className="element__image"
                                     style={{ backgroundImage: `url(${card.link})` }}
                                     alt={card.name}>
                                </div>
                                <div className="element__wrapper">
                                    <h2 className="element__title">{card.name}</h2>
                                    <div className="element__likes">
                                        <button className="element__like-button"
                                                type="button"
                                                aria-label="Нравится">
                                        </button>
                                        <span className="element__likes-counter">
                                            {card.likes.length}
                                        </span>
                                    </div>
                                </div>
                                <button className="element__del-button"
                                        type="button"
                                        aria-label="Удалить">
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </section>

        </main>
    );
}

export default Main;