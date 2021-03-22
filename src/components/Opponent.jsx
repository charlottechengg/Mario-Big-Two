import React, { Component } from 'react'
import Card from './Card.jsx'

class Opponent extends Component {
    render() {
        const cards = this.props.cards;

        return (
            <div className={"opponent-container " + this.props.class}>
                {cards && cards.map((card, i) => <Card key={i} card={card} class={this.props.cardClass} user="opponent" />
                )}
            </div>
        )
    }
}

export default Opponent