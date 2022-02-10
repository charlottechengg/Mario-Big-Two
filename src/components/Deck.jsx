/**
 * @file Deck.jsx
 * @description This file exports a Deck react component.
 * @author Jiaxin Tang
 * @version Latest edition on April 11, 2021
 */

import Card from './Card.jsx'
import React from 'react'

/**
 * @description This react arrow function represents a deck component in a big two game.
 * @param {*} props Props from parent component.
 * @return a div element displaying the deck
 */
const Deck = (props) => {
    if(props.cards){
        return (
            <div className={"opponent-container " + props.class}>
                {props.cards.map((card, i) => <Card class={props.cardClass} user="opponent" key={i} card={card}/>
                )}
            </div>
        )
    }
}

Deck.defaultProps = {
    props:{
        cardClass: "",
    }
}

/**
 * @exports Deck
 */
export default Deck