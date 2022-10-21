import React from 'react';

function ImagePopup() {
    return (
        <div className="popup popup_type_expand-image">
            <div className="popup__image-container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно">
                </button>
                <figure className="popup__figure">
                    <img className="popup__image"
                         src=""
                         alt=""
                    />
                    <figcaption className="popup__caption"></figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;