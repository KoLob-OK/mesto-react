import React from 'react';
import PopupWithForm from "./PopupWithForm";

//можно сделать деструктуризацию (function EditAvatarPopup({ isOpen, onClose }){})
function EditAvatarPopup(props) {

    return(
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_avatar"
                    type="url"
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    value=""
                    required
                />
                <span id="avatar-error"
                      className="form__input-error"
                />
                <button className="form__submit"
                        type="submit">
                    Сохранить
                </button>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup