import React from 'react';

//можно сделать деструктуризацию (function PopupWithForm({ name, title, children, isOpen, onClose }){})
function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button type="button"
                        className="popup__close"
                        aria-label="Закрыть окно"
                        onClick={props.onClose}
                />
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