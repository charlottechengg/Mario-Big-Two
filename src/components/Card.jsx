import React from 'react';

const Card = (props) => {
	const path = props.card.imagePath;
	const images = importAll(require.context('../res/Asset', false, /\.png$/));
	/*!
	 * Imports all card images from the folder.
	 * \fn string replaceStrings(translation, parameters)
	 * \memberof Definitions
	 * \param string translation Translation string
	 * \param array parameters (optional) List of parameters
	 * \return string replaced string
	 */
	function importAll(r) {
		let images = {};
		r.keys().forEach(item => {
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
			<img
				onClick={() => props.selectCard(props.card)}
				className={'card ' + classname}
				alt="player-card"
				src={images[path]}
			/>
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
