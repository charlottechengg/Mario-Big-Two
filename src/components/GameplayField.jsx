import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from './Card.jsx'


/*!
 * \Class GameplayField Arranges the field for the cards that players dealt.
 * \param props
 * \return div element
 */
const GameplayField = (props) => {
    return (
        <div className="gameplayfield-container">
            <div className="gameplayfield-section section-top" id="opponentTop">
                {props.opponentTop.map((card, i) => {return (<Card class="field-card" key={i} card={card} user="field" />)})}
            </div>
            <div className="gameplayfield-section">
                <div className="left-field" id="opponentLeft">
                    {props.opponentLeft.map((card, i) => {return (<Card class="field-card" key={i} card={card} user="field" />)})}
                </div>
                <div className="right-field" id="opponentRight">
                    {props.opponentRight.map((card, i) => {return (<Card class="field-card" key={i} card={card} user="field" />)})}
                </div>
            </div>
            <div className="gameplayfield-section section-top" id="player">
                <div className="gameplayfield-player">
                    {props.player.map((card, i) => {return (<Card key={i} card={card} class="field-card" user="field" />)})}
                </div>
                <div className="gameplayfield-text">{props.playerFieldText}</div>
                </div>
            </div>
        )

}

GameplayField.defaultProps = {
    props:{
        playerFieldText: "",
    }
}

GameplayField.propTypes = {
    props:{
        playerFieldText: PropTypes.string.isRequired,
    }
}


export default GameplayField
