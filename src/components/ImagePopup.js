import { useEffect } from 'react';

function ImagePopup({ card, onClose }) {

    useEffect(() => {
        const handleEscClick = (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                onClose()
            }
        }

        if (card) {
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
        <div className={`popup popup_type_card-photo ${card ? 'popup_opened' : ''}`} onClick={handleOverlayClick}>
            <div className="popup__container popup__container_card_photo">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <figure className="popup__photo">
                    <img className="popup__img" src={card?.link} alt={card?.name} />
                    <figcaption className="popup__figcaption">{card?.name}</figcaption>
                </figure>
            </div>
        </div>
    )
}

export default ImagePopup;