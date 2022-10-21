import React from 'react';
import userDefaultAvatar from "../images/user-avatar.png";
// import {selectors} from "../utils/constants";

function Main(props) {
    return (
        <main className="content page__content">

            <section className="profile content__profile">
                <div className="profile__card">
                    <img className="profile__avatar"
                         src={userDefaultAvatar}
                         alt="Ваш аватар"
                    />
                    <button className="profile__avatar-button"
                            type="button"
                            aria-label="Обновить аватар"
                            onClick={props.onEditAvatar}>
                    </button>
                    <div className="profile__info">
                        <h1 className="profile__title">Жак-Ив</h1>
                        <button className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={props.onEditProfile}>
                        </button>
                        <p className="profile__description">Исследователь</p>
                    </div>

                </div>
                <button className="profile__add-button"
                        type="button"
                        aria-label="Добавить фото"
                        onClick={props.onAddPlace}>
                </button>
            </section>

            <section className="elements content__elements">
                <ul className="elements__list"></ul>
            </section>

        </main>
    );
}

export default Main;