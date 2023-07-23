import React from 'react';

function Card({ card, onCardClick }) {

    function handleClick() {
        onCardClick(card)
    }

    return (

        <article className="element">
            <button className="element__del" type="button"></button>
            <img src={card.link} alt={card.name} className="element__photo" onClick={handleClick} />
            <div className="element__description">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className="element__like"></button>
                    <p className="element__reaction-counter">0</p>
                </div>
            </div>
        </article>

    )
}

export default Card;