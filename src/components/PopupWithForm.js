import React, { useEffect } from 'react';

function PopupWithForm({ name, title, buttonText, isOpen, onClose, children }) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscClick)
        }

        return () => {
            document.removeEventListener('keydown', handleEscClick)
        }
    })


    function handleOverlayClick(evt) {
        if (evt.target === evt.currentTarget) {
            onClose()
        }
    }

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
            onClick={handleOverlayClick}>
            <div className="popup__container">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>
                <form name={`${name}-form`} className={`popup__form popup__form_${name}`} noValidate>
                    {children}
                    <button type="submit" name="submit" value="submit"
                        className="popup__input-save popup__input-disabled" disabled>{buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;