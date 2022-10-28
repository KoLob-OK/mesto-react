import React from 'react';
import userDefaultAvatar from "../images/user-avatar.png";
import api from "../utils/api";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

//можно сделать деструктуризацию (function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }){})
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api
            .getInitialCards()
            .then(data => {
                setCards(data);
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    function handleCardLike(card) {
        // Проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api
            .changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(cardID) {

        api
            .delCard(cardID)
            .then(() => {
                setCards((state) => state.filter((card) => card._id !== cardID));
            })
            .catch(err => {
                console.log(`Ошибка: ${err}`);
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
                            onClick={props.onEditAvatar}
                    />

                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={props.onEditProfile}
                        />
                        <p className="profile__description">{currentUser.about}</p>
                    </div>

                </div>
                <button className="profile__add-button"
                        type="button"
                        aria-label="Добавить фото"
                        onClick={props.onAddPlace}
                />
            </section>

            <section className="elements content__elements">
                <ul className="elements__list">
                    {cards.map(card => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={props.onCardClick}
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