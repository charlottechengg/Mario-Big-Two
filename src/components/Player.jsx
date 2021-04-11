/**
 * @file Player.jsx
 * @description React extension javascript that exports a Player react component.
 * @author Manyi Cheng
 */
import React, { useState } from 'react';
import marioImg from '../res/mario.png';
import Card from './Card.jsx';

/**
 * @description This react arrow function represents a Player component in a BigTwo game.
 * @param {*} props Props from parent component.
 * @returns React div HTML element displaying the player component
 */
const Player = (props) => {
	const [selectedCards, setSelectCard] = useState([]);

	/**
	 * @description This react arrow function selects a card upon click event.
	 * @param {*} card The clicked card
	 */
	const selectCard = (card) => {
		let newSelectedCards = [];
		if (selectedCards.includes(card)) {
			const index = selectedCards.indexOf(card);
			newSelectedCards = [...selectedCards.slice(0, index), ...selectedCards.slice(index + 1)];
		} else {
			newSelectedCards = selectedCards.concat([card]);
		}
		setSelectCard(newSelectedCards);
	};

	/**
	 * @description This react arrow function handles player click upon user clicking deal button.
	 * @param {*} e Click event
	 */
	const handleDeal = (e) => {
		e.preventDefault();
		if (props.playerTurn) {
			if (props.playCards(selectedCards)) {
				setSelectCard([]);
			}
			document.getElementById('playbtn').disabled = true;
			setTimeout(() => {
				if (document.getElementById('playbtn')) document.getElementById('playbtn').disabled = false;
			}, 1500);
		}
	};

	/**
	 * @description This react arrow function handles player click upon user clicking pass button.
	 * @param {*} e Click event
	 */
	const handlePass = (e) => {
		e.preventDefault();
		if (props.playerTurn) {
			props.passTurn();
			document.getElementById('passbtn').disabled = true;
			setTimeout(() => {
				if (document.getElementById('passbtn')) document.getElementById('passbtn').disabled = false;
			}, 1500);
		}
	};

	/**
	 * @description This react arrow function sorts the player deck based on type order in increasing order upon user clicking type button.
	 */
	const handleTypeSort = () => {
		props.typeSort();
	};

	/**
	 * @description This react arrow function sorts the player deck based on suit order in increasing order upon user clicking suit button.
	 */
	const handleSuitSort = () => {
		props.suitSort();
	};

	let actionButton = props.playerTurn ? '' : 'disabled-button';
	let freeMoveButton = !props.freeMove ? '' : 'disabled-button';
	return (
		<div className="player-container">
            <img className = "player-icon" alt = "character" src = {marioImg}/>
			{props.cards &&
				props.cards.map((card, i) => {
					let selected = selectedCards.includes(card);
					return <Card key={i} card={card} user="player" selectCard={selectCard} selected={selected} />;
				})}
			{!props.gameOver && (
				<div className="player-action">
					<button id="playbtn" className={'player-button ' + actionButton} onClick={handleDeal}>
						Deal
					</button>
					<button
						id="passbtn"
						className={'player-button ' + actionButton + ' ' + freeMoveButton}
						onClick={handlePass}
					>
						Pass
					</button>
					<button className="player-button" onClick={handleTypeSort}>
						Type
					</button>
					<button className="player-button" onClick={handleSuitSort}>
						Suit
					</button>
				</div>
			)}
		</div>
	);
};

export default Player;
