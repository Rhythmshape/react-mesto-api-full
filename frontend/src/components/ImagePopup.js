function ImagePopup({ name, card, onClose, onCloseClick }) {
    return (
        <div className={`popup popup_type_${name} ${card ? `popup_opened` : ""}`} onClick={onCloseClick}>
            <figure className="popup__image-container">
                <button type="button"
                    id="image-close"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
                <img
                    src={card?.link}
                    alt={card?.name}
                    className="popup__image" />
                <figcaption className="popup__image-caption">{card ? card.name : ''}</figcaption>
            </figure>
        </div>
    );
}

export default ImagePopup;
