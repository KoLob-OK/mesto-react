import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose }) {
    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value=""
                    required/>
                <span id="name-error" className="form__input-error"/>

                <input
                    className="form__input form__input_type_link"
                    type="url"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    value=""
                    required
                />
                <span id="link-error" className="form__input-error"/>

                <button className="form__submit" type="submit">Создать</button>

            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;