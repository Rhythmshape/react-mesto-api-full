import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ onSubmit, isOpen, onClose, onCloseClick }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            name: name,
            link: link
        })
    }

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onClose={onClose}
            name={'element-add'}
            form={'place-form'}
            formId={'place-form'}
            title={'Новое место'}
            buttonText={'Создать'}
            onSubmit={handleSubmit}>
            <input
                type="text"
                id="place-title"
                name="name"
                placeholder="Название"
                className="edit-form__item edit-form__item_type_place"
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
                required />
            <span className="edit-form__input-error place-title-error"></span>
            <input
                type="url"
                id="place-link"
                name="link"
                placeholder="Ссылка на картинку"
                className="edit-form__item edit-form__item_type_place-link"
                value={link}
                onChange={handleLinkChange}
                required />
            <span className="edit-form__input-error place-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
