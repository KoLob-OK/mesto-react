import React from 'react';
import PopupWithForm from './PopupWithForm';

//можно сделать деструктуризацию (function EditProfilePopup({ isOpen, onClose }){})
function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name="profile-edit"
            title="Редактировать профиль"
            isOpen={props.isOpen}
            onClose={props.onClose}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_username"
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Имя"
                    minLength="2"
                    maxLength="40"
                    value={name ?? ''}
                    onChange={handleNameChange}
                    required
                />
                <span id="username-error" className="form__input-error"/>

                <input
                    className="form__input form__input_type_job"
                    type="text"
                    name="job"
                    id="job"
                    placeholder="О себе"
                    minLength="2"
                    maxLength="200"
                    value={description ?? ''}
                    onChange={handleDescriptionChange}
                    required
                />
                <span id="job-error" className="form__input-error"/>

                <button className="form__submit"
                        type="submit">
                    Сохранить
                </button>

            </fieldset>
        </PopupWithForm>
    )
}

export default EditProfilePopup;