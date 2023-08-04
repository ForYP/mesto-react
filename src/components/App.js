import React, { useEffect, useState } from 'react'; // импорт библиотеки
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeleteCardPopup from './DeleteCardPopup'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from '../utils/Api';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [cardDelete, setCardDelete] = useState({});

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch(console.error)
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((c) => c._id === currentUser._id);
    return api.changeLikeCardStatus(card, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch(console.error)
  }

  function handleCardDelete(card) {
    setIsLoading(true)
    return api.deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups()
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleUpdateUser(value) {
    setIsLoading(true)
    return api.updateUserInfo(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(value) {
    setIsLoading(true)
    return api.updateAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(value) {
    setIsLoading(true)
    return api.updateCards(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }

  function handleOpenCardDeletePopup(card) {
    setIsDeleteCardPopupOpen(true);
    setCardDelete(card);
  };

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
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__conteiner">

        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleOpenCardDeletePopup}
          onClose={closeAllPopups}
        />
        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onLoading={isLoading}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onLoading={isLoading}
        />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleCardDelete}
          card={cardDelete}
          onLoading={isLoading}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;