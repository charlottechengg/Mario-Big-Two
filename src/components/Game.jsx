/**
 * @file Game.jsx
 * @description React extension javascript that exports a Game react component.
 * @author Manyi Cheng
 */

import React, { Component } from 'react';
import Player from './Player.jsx';
import Deck from './Deck.jsx';
import GameplayField from './GameplayField.jsx';
import peachIcon from '../res/peach.png';
import luigiIcon from '../res/luigi.png';
import booIcon from '../res/boo.png';
import Timer from './Timer.js';
import * as Rules from '../Rules.js';
import * as Computer from '../Computer.js';
import startButton from '../res/startbutton.png';


/**
 * @class A class that extends react Component, represents a big two Game.
 * @description This class represents Game component in a big two game.
 * @param {*} props Props from parent component.
 */
class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rules: true,
			playerScore: 0,
			playerCards: [],
			leftCards: [],
			topCards: [],
			rightCards: [],
			playerField: [],
			leftField: [],
			topField: [],
			rightField: [],
			startingTurn: true,
			turn: null,
			minutes: 10,
			seconds: 0,
			cardsPlayed: [],
			freeMove: false,
			lastMove: [],
			lastMovePlayer: null,
			gameOver: false,
		};
		this.startGame = this.startGame.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.handlePlayerDeal = this.handlePlayerDeal.bind(this);
		this.handlePlayerPass = this.handlePlayerPass.bind(this);
		this.AIplayCards = this.AIplayCards.bind(this);
		this.updateNextTurn = this.updateNextTurn.bind(this);
		this.updateField = this.updateField.bind(this);
		this.updateNextTurnCards = this.updateNextTurnCards.bind(this);
		this.getCardsforTurn = this.getCardsforTurn.bind(this);
		this.typeSort = this.typeSort.bind(this);
		this.handleTimer = this.handleTimer.bind(this);
		this.suitSort = this.suitSort.bind(this);
		this.isGameOver = this.isGameOver.bind(this);
		this.displayPass = this.displayPass.bind(this);
	}

	/**
	 * @description Execute the code synchronously when the component gets loaded or mounted in the DOM. This method is called during the mounting phase of the React Life-cycle
	 * @deprecated Will be decrecated be React in the future.
	 */
	UNSAFE_componentWillMount() {
		this.resetGame();
	}

	/**
	 * @description Starts the game upon user closing the rules.
	 */
	startGame() {
		this.setState({
			rules: false,
		});
		if (this.state.turn !== 'player') {
			this.AIplayCards();
		}
	}

	/**
	 * @description Resets game states upon user clicking play again button.
	 */
	async resetGame() {
		let deck = Rules.newDeck();

		let playerCards = await Rules.setUserCards(deck);
		let leftCards = await Rules.setUserCards(deck);
		let topCards = await Rules.setUserCards(deck);
		let rightCards = await Rules.setUserCards(deck);

		let turn = Rules.setFirstTurn(playerCards, leftCards, topCards, rightCards);

		this.setState({
			rules: true,
			playerScore: 0,
			playerField: [],
			leftField: [],
			topField: [],
			rightField: [],
			playerCards: playerCards,
			leftCards: leftCards,
			topCards: topCards,
			rightCards: rightCards,
			initialMinutes: 10,
			initialSeconds: 0,
			turn: turn,
			startingTurn: true,
			cardsPlayed: [],
			lastMove: [],
			lastMovePlayer: null,
			gameOver: false,
			playerFieldText: '',
		});
	}

	/**
	 * Handles game over condition when the timer reaches 0.
	 */
	handleTimer() {
		this.setState({
			gameOver: true,
		});
	}

	/**
	 * @description player action on clicking deal button with selected cards.
	 * @param {*} cards Selected cards to be dealt.
	 * @returns true if valid play, false if invalid play.
	 */
	handlePlayerDeal(cards) {
		this.setState({ playerFieldText: '' });
		if (this.state.startingTurn) {
			let validPlay = Rules.isValidStartingPlay(cards);

			if (validPlay) {
				this.updateNextTurnCards(cards);
				this.setState({ startingTurn: false });
				return true;
			} else {
				this.setState({
					playerFieldText: 'Your play must be valid and contain 3 of diamonds for starting turn',
				});
			}
		} else {
			let valid = Rules.isValidPlay(cards);
			let isFreeMove = this.state.lastMovePlayer === 'player';
			let stronger = Rules.isStrongerPlay(this.state.lastMove, cards);

			if (valid && (isFreeMove || stronger)) {
				this.updateNextTurnCards(cards);
				return true;
			} else {
				if (!valid) {
					this.setState({
						playerFieldText: 'Your play must be valid',
					});
				} else if (!stronger && cards.length === this.state.lastMove.length) {
					this.setState({ playerFieldText: 'Your play must be stronger than the previous play' });
				} else if (cards.length !== this.state.lastMove) {
					this.setState({
						playerFieldText: 'Your play must contain same number of cards as the previous play',
					});
				}
			}
		}
	}

	/**
	 * @description Controls the logic when its bot's turn to play cards.
	 */
	AIplayCards() {
		let currentCards = this.getCardsforTurn();
		let bestMove;

		if (this.state.startingTurn) {
			bestMove = Computer.AIplayStartingTurn(currentCards);
			this.setState({ startingTurn: false });
		} else {
			if (this.state.lastMovePlayer === this.state.turn) {
				bestMove = Computer.AIplayFreeMove(currentCards);
			} else {
				bestMove = Computer.AIplayCards(currentCards, this.state.lastMove);
			}
		}

		this.updateNextTurnCards(bestMove);
	}

	/**
	 * @description gets the current players' cards of the turn.
	 * @returns current player cards
	 */
	getCardsforTurn() {
		if (this.state.turn === 'left') return this.state.leftCards;
		if (this.state.turn === 'top') return this.state.topCards;
		if (this.state.turn === 'right') return this.state.rightCards;
		if (this.state.turn === 'player') return this.state.playerCards;
	}

	/**
	 * @description Updates state cards for next turn based on the cards dealt by the current player.
	 * @param {*} cards Cards dealt by the current player.
	 */
	updateNextTurnCards(cards) {
		if (cards) {
			let cardsPlayed = this.state.cardsPlayed;
			let currentPlayerCards = this.getCardsforTurn();

			cards.forEach((card) => {
				currentPlayerCards.splice(currentPlayerCards.indexOf(card), 1);
			});

			if (this.state.lastMove) {
				this.state.lastMove.forEach((card) => {
					cardsPlayed.push(card);
				});
			}

			if (this.state.turn === 'left') this.setState({ leftCards: currentPlayerCards });
			if (this.state.turn === 'top') this.setState({ topCards: currentPlayerCards });
			if (this.state.turn === 'right') this.setState({ rightCards: currentPlayerCards });
			if (this.state.turn === 'player') this.setState({ playerCards: currentPlayerCards });

			this.updateField(cards);

			this.setState(
				{
					cardsPlayed: cardsPlayed,
					lastMove: cards,
					freeMove: false,
					lastMovePlayer: this.state.turn,
				},
				() => {
					this.updateNextTurn();
				}
			);
		} else {
			if (this.state.turn === 'left')
				this.setState({ leftField: [] }, () => {
					this.displayPass();
				});
			if (this.state.turn === 'top')
				this.setState({ topField: [] }, () => {
					this.displayPass();
				});
			if (this.state.turn === 'right')
				this.setState({ rightField: [] }, () => {
					this.displayPass();
				});
			if (this.state.turn === 'player')
				this.setState({ playerField: [] }, () => {
					this.displayPass();
				});

			this.updateNextTurn();
		}
	}

	/**
	 * @description Updates the GamplayField when players deal cards.
	 * @param {*} cards Field cards
	 */
	updateField(cards) {
		if (this.state.turn === 'left')
			this.setState({ leftField: [] }, () => {
				this.setState({ leftField: cards });
			});
		if (this.state.turn === 'top')
			this.setState({ topField: [] }, () => {
				this.setState({ topField: cards });
			});
		if (this.state.turn === 'right')
			this.setState({ rightField: [] }, () => {
				this.setState({ rightField: cards });
			});
		if (this.state.turn === 'player')
			this.setState({ playerField: [] }, () => {
				this.setState({ playerField: cards });
			});
	}

	/**
	 * @description Set states turn, and field text for next turn, then on call back triggers next turn's play.
	 * @returns Nothing
	 */
	updateNextTurn() {
		if (this.isGameOver()) return;
		setTimeout(() => {
			if (this.state.turn === 'player') {
				this.setState({ turn: 'right', playerFieldText: '' }, () => {
					this.AIplayCards();
				});
			} else if (this.state.turn === 'right') {
				this.setState({ turn: 'top' }, () => {
					this.AIplayCards();
				});
			} else if (this.state.turn === 'top') {
				this.setState({ turn: 'left' }, () => {
					this.AIplayCards();
				});
			} else this.setState({ turn: 'player' });
		}, 1200);
	}

	/**
	 * @description Handles player passing for starting turn, last move, free move and normal situations.
	 */
	handlePlayerPass() {
		if (this.state.startingTurn) {
			this.setState({
				freeMove: true,
				playerFieldText: 'You cannot pass the first turn',
			});
		} else if (this.state.lastMovePlayer === 'player') {
			this.setState({
				freeMove: true,
				playerFieldText: 'You cannot pass the free move',
			});
		} else {
			this.setState({ playerField: [], playerFieldText: '' });
			this.displayPass();
			this.updateNextTurn();
		}
	}

	/**
	 * @description Sorts player's cards in type order upon player clicking type button.
	 */
	typeSort() {
		let cards = this.state.playerCards;
		Rules.sortCardsValue(cards);

		this.setState({ playerCards: cards });
	}
	/**
	 * @description Sorts player's cards in suit order upon player clicking suit button.
	 */
	suitSort() {
		let cards = this.state.playerCards;
		Rules.sortCardsSuit(cards);

		this.setState({ playerCards: cards });
	}

	/**
	 * @description Checks whether the game is over and sets the game states gameOver and playerScore 1s after validation.
	 */
	isGameOver() {
		let currentPlayerCards = this.getCardsforTurn();
		if (currentPlayerCards.length === 0) {
			let score = this.computePlayerScore();
			setTimeout(() => {
				this.setState({
					gameOver: true,
					playerScore: score,
				});
				return true;
			}, 1000);
		}
	}

	/**
	 * @description Computes player score of the game.
	 * @returns {int} Computed score.
	 */
	computePlayerScore() {
		let len = this.state.playerCards.length;
		return Math.ceil((13 - len) * (100 / 13));
	}

	/**
	 * @description Displays text when players choose to pass the current turn.
	 */
	displayPass() {
		let field = this.state.turn;
		let node = document.createElement('div');
		node.append(document.createTextNode('Pass'));
		node.setAttribute('class', 'gameplayfield-text');
		document.getElementById(field).append(node);
		setTimeout(() => {
			document.getElementById(field).removeChild(node);
		}, 1000);
	}

	render() {
		if (this.state.rules) {
			return (
				<div>
					<div className="game-container">
						<div className="window-container">
							<div className="window">
								<div className="rules-cover">
									<h4 className="rules-heading">
										<span className="rules-heading-span">Rules</span>
									</h4>
								</div>
								<div className="rules-details">
									<ul className="rules-details">
										<li>Type: 2 > A > K > Q > J > 10 > 9 > 8 > 7 > 6 > 5 > 4 > 3 </li>
										<li>suits: Spades > hearts > clubs > diamonds</li>
										<li>Playable combinations: single, pairs, triples, five-cards</li>
										<li>
											A combination can only be beaten by a better combination with the same
											number of cards.
										</li>
										<li> </li>
										<li>A Straight consists of five cards of consecutive rank with mixed suits.</li>
										<li>A Flush consists of any five cards of the same suit.</li>
										<li>
											A Full House consists of three cards of one rank and two of another rank
										</li>
										<li>A quads is made up of all four cards of one rank, plus any fifth card</li>
										<li>A Straight Flush consists of five consecutive cards of the same suit.</li>
									</ul>
								</div>
								<div className="rules-button">
									<img
										className="start-button"
										src={startButton}
										onClick={this.startGame}
										alt="start-button"
									/>
								</div>
								<div>3XA3 G06</div>
							</div>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<div className="game-container">
						{this.state.gameOver && <div className="window-container">
							<div className="window">
								<div className="gameover-container">
									<div>Game Over!</div>
									<div>Score {this.state.playerScore}</div>
									<button
										id="reset-button"
										disabled={false}
										className="playagain-button"
										onClick={this.resetGame}
									>
										Play Again
									</button>
								</div>
							</div>
						</div>}
						<div className="game-opponent">
							<img src={booIcon} alt="character" className="top-icon" />
							<img src={luigiIcon} alt="character" className="opponent-icon" />
							<div className="game-left">
								<Deck
									class="opponent-container-left"
									cardClass="computer-side"
									cards={this.state.leftCards}
								></Deck>
							</div>
							<div className="game-middle">
								<Deck
									class="opponent-container-top"
									cardClass="computer-top"
									cards={this.state.topCards}
								></Deck>
								<GameplayField
									player={this.state.playerField}
									right={this.state.rightField}
									left={this.state.leftField}
									top={this.state.topField}
									playerFieldText={this.state.playerFieldText}
								></GameplayField>
							</div>
							<div className="game-right">
								<Timer
									initialMinutes={this.state.minutes}
									initialSeconds={this.state.seconds}
									onTimer={this.handleTimer}
								/>
								<Deck
									class="opponent-container-right"
									cardClass="computer-side"
									cards={this.state.rightCards}
								></Deck>
							</div>
							<img src={peachIcon} alt="character" className="opponent-icon" />
						</div>
						<Player
							cards={this.state.playerCards}
							playerTurn={this.state.turn === 'player'}
							freeMove={this.state.freeMove}
							playCards={this.handlePlayerDeal}
							passTurn={this.handlePlayerPass}
							turn={this.state.turn}
							typeSort={this.typeSort}
							suitSort={this.suitSort}
							gameOver={this.state.gameOver}
							playerScore={this.state.playerScore}
						></Player>
					</div>
				</div>
			);
		}
	}
}

export default Game;
