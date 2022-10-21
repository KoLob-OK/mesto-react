import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name}`}>
            <div className="popup__container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно">
                </button>
                <h2 className="popup__title">{props.title}</h2>
                <form name={`${props.name}-form`}
                      action="#"
                      className="form popup__form"
                      noValidate>
                {props.children}
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;