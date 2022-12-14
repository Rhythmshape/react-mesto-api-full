function PopupWithForm({ name, isOpen, title, formId, form, container, children, buttonText, onClose, onCloseClick, onSubmit }) {

    return (
        <div className={`popup popup_type_${name} ${isOpen ? `popup_opened` : ""}`} onClick={onCloseClick}>
            <div className={`popup__container popup__container_${container}`}>
                <h2 className="popup__title">{title}</h2>
                <form
                    id={formId}
                    name={form}
                    className="edit-form"
                    onSubmit={onSubmit}>
                    {children}
                    <button
                        type="submit"
                        className="edit-form__submit-button">
                        {buttonText}
                    </button>
                </form>
                <button
                    id="profile-close"
                    type="button"
                    className="popup__close-button"
                    onClick={onClose}>
                </button>
            </div>
        </div>
    );
}
export default PopupWithForm;