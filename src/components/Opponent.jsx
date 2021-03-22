import Card from './Card.jsx'
import React from 'react'
import PropTypes from 'prop-types'


const Opponent = (props) => {
    if(props.cards){
        return (
            <div className={"opponent-container " + props.class}>
                {props.cards.map((card, i) => <Card class={props.cardClass} user="opponent" key={i} card={card}/>
                )}
            </div>
        )
    }
}

Opponent.defaultProps = {
    props:{
        cardClass: "",
    }
}

Opponent.propTypes = {
    props:{
        cardClass: PropTypes.string.isRequired,
    }
}

export default Opponent