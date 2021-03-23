import React, { useState } from 'react'
import Card from './Card.jsx'

/*!
 * \Class Player
 * \param props
 * \return div element
 */
const Player = (props) =>{

    const [selectedCards, setSelectCard] = useState([]);

    const selectCard = (card) => {
        let newSelectedCards =[];
        if(newSelectedCards.includes(card) ) {
        const index = selectedCards.indexOf(card)
        newSelectedCards = [...selectedCards.slice(0, index), ...selectedCards.slice(index + 1)]
    } else {
        newSelectedCards = selectedCards.concat([card]);
    }
    setSelectCard(newSelectedCards)
    console.log('changed');
    }

    const handlePlayClick = (e) =>{
        e.preventDefault()
        if(props.playerTurn) {
            if(props.playCards(selectedCards)) {
                setSelectCard([])
            }
            document.getElementById("playbtn").disabled = true
            setTimeout(()=> {
                if(document.getElementById("playbtn")) document.getElementById("playbtn").disabled = false
            },1500)
        }
        
    }

    const handlePassTurnClick = (e) =>{
        e.preventDefault()
        if(props.playerTurn) {
            props.passTurn()
            document.getElementById("passbtn").disabled = true
            setTimeout(()=> {
                if(document.getElementById("passbtn")) document.getElementById("passbtn").disabled = false
            },1500)
        }     
    }

    const handleNumberSort = () =>{
        props.numberSort()
    }

    const handleSuitSort = () =>{
        props.suitSort()
    }

    const handleReset = () =>{
        props.resetGame()
    }


    let actionButton = props.playerTurn ? "" : "disabled-button";
        return(
            <div className="player-container">
                {props.cards && props.cards.map((card, i) => {
                    let selected = selectedCards.includes(card)
                    return(<Card key={i} card={card} user="player" selectCard={selectCard} selected={selected}/>)
                        }
                )}
                
                {props.gameover ? <div className="player-action">
                    <div>Game Over!</div>
                        <button id="resetbtn" disabled={false} className="player-button" onClick={handleReset}>Play Again</button>
                    </div> :  <div className="player-action">
                        <button id="playbtn" className={"player-button " + actionButton} onClick={handlePlayClick}>Deal</button>
                        <button id="passbtn" className={"player-button " + actionButton} onClick={handlePassTurnClick}>Pass</button>
                        <button className="player-button" onClick={handleNumberSort}>Type</button>
                        <button className="player-button" onClick={handleSuitSort}>Suit</button>
                    </div>}
            </div> 
        )
        
    }

Player.defaultProps = {
}

export default Player