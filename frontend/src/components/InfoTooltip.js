function InfoTooltip({ isOpen, onCloseClick, image, title, onClose, name }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`} onClick={onCloseClick}>
            <div className="popup__info">
                <img className="popup__status-view" src={image} alt={title} />
                <h2 className="popup__status-message">{title}</h2>
                <button className="popup__close-button" type="button" title="Закрыть" onClick={onClose} />
            </div>
        </div>
    )
}

export default InfoTooltip;