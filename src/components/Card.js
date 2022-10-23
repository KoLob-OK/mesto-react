import React from 'react';

function Card(props) {
    //можно сделать деструктуризацию (function Card({ card, onClose }){})
    function handleCardClick() {
        props.onCardClick(props.card);
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
                    <button className="element__like-button"
                            type="button"
                            aria-label="Нравится">
                    </button>
                    <span className="element__likes-counter">
                                            {props.card.likes.length}
                                        </span>
                </div>
            </div>
            <button className="element__del-button"
                    type="button"
                    aria-label="Удалить">
            </button>
        </li>
    );
}

export default Card;