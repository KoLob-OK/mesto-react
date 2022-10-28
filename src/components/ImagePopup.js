import React from 'react';

//можно сделать деструктуризацию (function ImagePopup({card, onClose}){})
function ImagePopup(props) {
    return (
        <div className={`popup popup_type_expand-image ${props.card.link ? "popup_opened" : ""}`}>
            <div className="popup__image-container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно"
                        onClick={props.onClose}>
                </button>
                <figure className="popup__figure">
                    <img className="popup__image"
                         src={props.card.link}
                         alt={props.card.name}
                    />
                    <figcaption className="popup__caption">{props.card.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;