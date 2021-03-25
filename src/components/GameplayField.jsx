import React from 'react';
import Card from './Card.jsx'


/*!
 * \Class GameplayField Arranges the field for the cards that players dealt.
 * \param props
 * \return div element
 */
const GameplayField = (props) => {

    return (
        <div className="gameplayfield-container">
            <div className="gameplayfield-section section-top" id="top">
                {props.top.map((card, i) => {return (<Card class="field-card" key={i} card={card} user="field" />)})}
            </div>
            <div className="gameplayfield-section">
                <div className="left-field" id="left">
                    {props.left.map((card, i) => {return (<Card class="field-card" key={i} card={card} user="field" />)})}
                </div>
                <div className="right-field" id="right">
                    {props.right.map((card, i) => {return (<Card class="field-card" key={i} card={card} user="field" />)})}
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



export default GameplayField
