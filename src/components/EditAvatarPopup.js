import React from 'react';
import PopupWithForm from "./PopupWithForm";

//можно сделать деструктуризацию (function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }){})
function EditAvatarPopup(props) {
    // Используем реф для получения прямого доступа к DOM-элементу инпута и его значению
    const refAvatarInput = React.useRef();

    // Обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: refAvatarInput.current.value
        });
    }

    return(
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_avatar"
                    type="url"
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    ref={refAvatarInput}
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