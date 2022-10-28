import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

//можно сделать деструктуризацию (function Card({ card, onCardClick, onCardLike, onCardDelete }){})
function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwner = props.card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = "element__del-button";
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card._id);
    }

    return (
        <li className="element">
            <div className="element__image"
                 style={{backgroundImage: `url(${props.card.link})`}}
                 alt={props.card.name}
                 onClick={handleCardClick}>
            </div>
            <div className="element__wrapper">
                <h2 className="element__title">{props.card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName}
                            type="button"
                            aria-label="Нравится"
                            onClick={handleLikeClick}
                    />
                    <span className="element__likes-counter">
                                            {props.card.likes.length}
                                        </span>
                </div>
            </div>
            {isOwner && <button className={cardDeleteButtonClassName}
                                type="button"
                                aria-label="Удалить"
                                onClick={handleDeleteClick}
                        />
            }
        </li>
    );
}

export default Card;