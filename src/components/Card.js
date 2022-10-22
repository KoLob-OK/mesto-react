import React from 'react';

function Card({card}) {
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
}

export default Card