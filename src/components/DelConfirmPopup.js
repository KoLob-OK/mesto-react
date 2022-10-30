import React from 'react';
import PopupWithForm from './PopupWithForm';

function DelConfirmPopup({ card, onClose, onConfirm }) {
    // Обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm
            name="del-card"
            title="Вы уверены?"
            isOpen={card}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <button className="form__submit"
                    type="submit">
                Да
            </button>
        </PopupWithForm>
    )
}

export default DelConfirmPopup