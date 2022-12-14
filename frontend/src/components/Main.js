import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, card, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardDelete, onCardLike }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="profile__avatar">
                    </img>
                    <button
                        onClick={onEditAvatar}
                        id="avatar-button"
                        type="button"
                        className="profile__avatar-edit-button">
                    </button>
                </div>
                <div className="profile__info">
                    <div className="profile__content">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button
                            type="button"
                            onClick={onEditProfile}
                            className="profile__edit-button">
                        </button>
                    </div>
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button"></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card
                            key={card._id}
                            card={card}
                            link={card.link}
                            name={card.name}
                            likes={card.likes.length}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDelete={onCardDelete}
                        />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;

