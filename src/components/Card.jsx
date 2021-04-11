/**
 * @file Card.jsx
 * @description This file exports a Card react component.
 * @author Manyi Cheng
 */
import React from 'react';
/**
 * @description This react arrow function represents a Card component in a BigTwo game.
 * @param {*} props Props from parent component.
 * @returns React div HTML element displaying the card.
 */
const Card = (props) => {
	const path = props.card.imagePath;
	const images = importAll(require.context('../res/Asset', false, /\.png$/));
	/**
	 * Imports all images from the parameter path r
	 * @function importAll
	 * @param {*} r Indicates the required path to the card image folder.
	 * @returns List of json objects containing the images.
	 */
	function importAll(r) {
		let images = {};
		r.keys().forEach((item) => {
			images[item.replace('./', '')] = r(item);
		});
		return images;
	}

	if (props.user === 'opponent') {
		return (
			<div>
				<img className={props.class} alt="opponent-card" src={images['Back.png']} />
			</div>
		);
	} else if (props.user === 'player') {
		const classname = props.selected ? 'selectedcard' : '';
		return (
			<div>
				<img
					onClick={() => props.selectCard(props.card)}
					className={'card ' + classname}
					alt="player-card"
					src={images[path]}
				/>
			</div>
		);
	} else {
		return <img className={props.class + ' flip-in-ver-left'} alt="field-card" src={images[path]} />;
	}
};

Card.defaultProps = {
	props: {
		user: '',
	},
};

export default Card;
