import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card, onLoading }) {
    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
    }

    return (
        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}
            buttonText={onLoading ? 'Удаление...' : 'Да'}
        />
    );
}

export default DeleteCardPopup;