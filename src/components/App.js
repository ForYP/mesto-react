import React, { useState } from 'react'; // импорт библиотеки
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (

    <div className="page__conteiner">

      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <input id="avatar-link" type="url" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
        <span id="error-avatar-link" className="popup__error-message"></span>
      </PopupWithForm>

      <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>

        <input type="text" id="profile-name" name="name" minLength="2" maxLength="40" className="popup__input popup__input_type_name" placeholder="Имя" required />
        <span id="error-profile-name" className="popup__error-message"></span>
        <input type="text" id="profile-status" name="status" minLength="2" maxLength="200" className="popup__input popup__input_type_status" placeholder="О себе" required />
        <span id="error-profile-status" className="popup__error-message"></span>

      </PopupWithForm>

      <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>

        <input id="card-title" type="text" name="name" className="popup__input popup__input_type_title" placeholder="Название" minLength="2" maxLength="30" required />
        <span id="error-card-title" className="popup__error-message"></span>
        <input id="card-link" type="url" name="link" className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" required />
        <span id="error-card-link" className="popup__error-message"></span>

      </PopupWithForm>

      <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да">
      </PopupWithForm>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
    </div>

  );
}

export default App;