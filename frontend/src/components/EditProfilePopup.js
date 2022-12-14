import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onCloseClick, onSubmit }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleDescriptionChange(evt) {
        setDescription(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            name: name,
            about: description
        })
    }

    useEffect(() => {
        if (isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [isOpen, currentUser]);

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onClose={onClose}
            name={'profile-editing'}
            form={'profile-edit-form'}
            formId={'profile-edit-form'}
            title={'Редактировать профиль'}
            buttonText={'Сохранить'}
            onSubmit={handleSubmit}>
            <input
                type="text"
                id="author_name"
                name="name"
                placeholder="Имя профиля"
                className="edit-form__item edit-form__item_type_name"
                minLength="2"
                maxLength="40"
                value={name}
                onChange={handleNameChange}
                required />
            <span className="edit-form__input-error author-name-error"></span>
            <input
                type="text"
                id="author_description"
                name="about"
                placeholder="Описание"
                className="edit-form__item edit-form__item_type_description"
                minLength="2"
                maxLength="200"
                value={description}
                onChange={handleDescriptionChange}
                required />
            <span className="edit-form__input-error author-description-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;