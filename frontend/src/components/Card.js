import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ link, name, likes, card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? `element__like-button_active` : ''}`
    );

    function handleImageClick() {
        onCardClick(card)
    };

    function handleLikeClick() {
        onCardLike(card)
    };

    function handleDeleteClick() {
        onCardDelete(card)
    };

    return (
        <article className="element">
            {isOwn && (<button
                className="element__delete-button"
                type="button"
                onClick={handleDeleteClick}>
            </button>)
            }
            <img className="element__image"
                src={link}
                alt={name}
                onClick={handleImageClick} />
            <div className="element__description">
                <h2 className="element__title">{name}</h2>
                <div className="element__likes">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}>
                    </button>
                    <p className="element__like-label">{likes}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;
