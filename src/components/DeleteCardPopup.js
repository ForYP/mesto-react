import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, onDeleteCard, card }) {
    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
    }

    return (
        <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}>
        </PopupWithForm>
    );
}

export default DeleteCardPopup;