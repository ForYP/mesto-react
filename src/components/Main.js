import React, { useState, useEffect } from 'react';
import api from '../utils/Api';
import Card from './Card';
import editAvatar from '../images/edit-avatar.svg';

function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick }) {

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then((cardsArray) => {
        setCards(cardsArray);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main">
          <div className="profile__avatar-container" onClick={onEditAvatar}>
            <img className="profile__avatar" src={userAvatar} alt="аватар" />
            <img className="profile__edit-avatar" src={editAvatar} alt="Редактировать профиль" />
          </div>
          <div className="profile__info">
            <div className="profile__united">
              <h1 className="profile__name">{userName}</h1>
              <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            </div>
            <p className="profile__status">{userDescription}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="elements">
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
          />
        ))
        }
      </section>
    </main>
  );
}

export default Main;




