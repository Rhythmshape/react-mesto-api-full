import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onCloseClick, onClose, onSubmit }) {
    const ref = useRef();

    function handleSubmit(evt) {
        evt.preventDefault();
        onSubmit({
            avatar: ref.current.value
        });
    }

    useEffect(() => {
        ref.current.value = '';
    }, [isOpen])

    return (
        <PopupWithForm
            isOpen={isOpen}
            onCloseClick={onCloseClick}
            onClose={onClose}
            name={'avatar-editing'}
            form={'avatar-edit-form'}
            formId={'avatar-edit-form'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            container={'avatar'}
            onSubmit={handleSubmit}
        >
            <input
                ref={ref}
                type="url"
                id="avatar_image_link"
                name="avatar"
                placeholder="Ссылка на аватар"
                className="edit-form__item edit-form__item_type_avatar-link"
                required />
            <span className="edit-form__input-error avatar-image-link-error"></span>

        </PopupWithForm>
    )
}

export default EditAvatarPopup;