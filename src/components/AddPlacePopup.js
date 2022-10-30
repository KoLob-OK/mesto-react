import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    // Используем управляемые компоненты для получения значений инпутов
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    //Сброс полей инпутов при закрытии попапа
    React.useEffect(() => {
        setName('');
        setLink('');
    }, [onClose]);

    // Обработчик названия карточки
    function handleNameChange(e) {
        setName(e.target.value);
    }

    // Обработчик ссылки карточки
    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    // Обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_name"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleNameChange}
                    required/>
                <span id="name-error"
                      className="form__input-error"
                />

                <input
                    className="form__input form__input_type_link"
                    type="url"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleLinkChange}
                    required
                />
                <span id="link-error"
                      className="form__input-error"
                />

                <button className="form__submit"
                        type="submit">
                    Создать
                </button>

            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;