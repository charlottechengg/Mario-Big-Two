import Card from './Card.jsx'
import React from 'react'

/*!
 * \Class Opponent
 * \param props
 * \return div element
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


export default Deck