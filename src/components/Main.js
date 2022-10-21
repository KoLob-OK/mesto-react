import React from 'react';
import userDefaultAvatar from "../images/user-avatar.png";
import api from "../utils/api";
// import {selectors} from "../utils/constants";

function Main(props) {
    const [userAvatar, setUserAvatar] = React.useState(userDefaultAvatar);
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');

    React.useEffect(() => {
        api.getUserData()
            .then((data) => {
                setUserAvatar(data.avatar);
                setUserName(data.name);
                setUserDescription(data.about);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    return (
        <main className="content page__content">

            <section className="profile content__profile">
                <div className="profile__card">

                    <div className="profile__avatar">
                        <div className="profile__avatar-img"
                             style={{backgroundImage: `url(${userAvatar})`}}>
                        </div>
                    </div>

                    <button className="profile__avatar-button"
                            type="button"
                            aria-label="Обновить аватар"
                            onClick={props.onEditAvatar}>
                    </button>


                    <div className="profile__info">
                        <h1 className="profile__title">{userName}</h1>
                        <button className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={props.onEditProfile}>
                        </button>
                        <p className="profile__description">{userDescription}</p>
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