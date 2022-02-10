/**
 * @file GameplayField.jsx
 * @description This file exports a GameplayField react component.
 * @author Jiaxin Tang
 * @version Latest edition on April 11, 2021
 */

import React from 'react';
import Card from './Card.jsx'



/**
 * @description This react arrow function arranges the field for the cards that players dealt in a big two game.
 * @param {*} props Props from parent component.
 * @return a div element displaying the field
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

/**
 * @exports GameplayField
 */
export default GameplayField
