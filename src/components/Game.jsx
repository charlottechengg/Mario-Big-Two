import React, { Component } from 'react';
import Player from './Player.jsx';
import Opponent from './Opponent.jsx';
import GameplayField from './GameplayField.jsx';
import Timer from './Timer.js';
import * as Rules from '../Rules.js';
import * as Computer from '../Computer.js';
import startButton from '../res/startbutton.png';
class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rules: true,
			playerScore: 0,
			playerCards: [],
			opponentLeftCards: [],
			opponentTopCards: [],
			opponentRightCards: [],
			playerField: [],
			opponentLeftField: [],
			opponentTopField: [],
			opponentRightField: [],
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
		this.playerPlayCards = this.playerPlayCards.bind(this);
		this.playerPassTurn = this.playerPassTurn.bind(this);
		this.AIplayCards = this.AIplayCards.bind(this);
		this.updateNextTurn = this.updateNextTurn.bind(this);
		this.updateField = this.updateField.bind(this);
		this.updateNextTurnCards = this.updateNextTurnCards.bind(this);
		this.getCardsforTurn = this.getCardsforTurn.bind(this);
		this.numberSort = this.numberSort.bind(this);
		this.handleTimer = this.handleTimer.bind(this);
		this.suitSort = this.suitSort.bind(this);
		this.isGameOver = this.isGameOver.bind(this);
		this.displayPassTurn = this.displayPassTurn.bind(this);
	}

	UNSAFE_componentWillMount() {
		this.resetGame();
	}

	async resetGame() {
		let deck = Rules.newDeck();

		let playerCards = await Rules.setUserCards(deck);
		let opponentLeftCards = await Rules.setUserCards(deck);
		let opponentTopCards = await Rules.setUserCards(deck);
		let opponentRightCards = await Rules.setUserCards(deck);

		let turn = Rules.setFirstTurn(playerCards, opponentLeftCards, opponentTopCards, opponentRightCards);

		this.setState({
			rules: true,
			playerScore: 0,
			playerField: [],
			opponentLeftField: [],
			opponentTopField: [],
			opponentRightField: [],
			playerCards: playerCards,
			opponentLeftCards: opponentLeftCards,
			opponentTopCards: opponentTopCards,
			opponentRightCards: opponentRightCards,
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
	startGame() {
		this.setState({
			rules: false,
		});
		if (this.state.turn !== 'player') {
			this.AIplayCards();
		}
	}

	handleTimer() {
		console.log(this.state.minutes + this.state.seconds);
		this.setState({
			gameOver: true,
		});
	}
	playerPlayCards(cards) {
		this.setState({ playerFieldText: '' });
		if (this.state.startingTurn) {
			let validPlay = Rules.isValidStartingPlay(cards);

			if (validPlay) {
				this.updateNextTurnCards(cards);
				this.setState({ startingTurn: false });
				return true;
			} else {
				this.setState({ playerFieldText: 'starting turn must be valid and contain 3 of diamonds' });
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

	AIplayCards() {
		let currentPlayerCards = this.getCardsforTurn();
		let playableCards;

		if (this.state.startingTurn) {
			playableCards = Computer.AIplayStartingTurn(currentPlayerCards);
			this.setState({ startingTurn: false });
		} else {
			if (this.state.lastMovePlayer === this.state.turn) {
				playableCards = Computer.AIplayFreeMove(currentPlayerCards);
			} else {
				playableCards = Computer.AIplayCards(currentPlayerCards, this.state.lastMove);
			}
		}

		this.updateNextTurnCards(playableCards);
	}

	getCardsforTurn() {
		if (this.state.turn === 'opponentLeft') return this.state.opponentLeftCards;
		if (this.state.turn === 'opponentTop') return this.state.opponentTopCards;
		if (this.state.turn === 'opponentRight') return this.state.opponentRightCards;
		if (this.state.turn === 'player') return this.state.playerCards;
	}

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

			if (this.state.turn === 'opponentLeft') this.setState({ opponentLeftCards: currentPlayerCards });
			if (this.state.turn === 'opponentTop') this.setState({ opponentTopCards: currentPlayerCards });
			if (this.state.turn === 'opponentRight') this.setState({ opponentRightCards: currentPlayerCards });
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
			if (this.state.turn === 'opponentLeft')
				this.setState({ opponentLeftField: [] }, () => {
					this.displayPassTurn();
				});
			if (this.state.turn === 'opponentTop')
				this.setState({ opponentTopField: [] }, () => {
					this.displayPassTurn();
				});
			if (this.state.turn === 'opponentRight')
				this.setState({ opponentRightField: [] }, () => {
					this.displayPassTurn();
				});
			if (this.state.turn === 'player')
				this.setState({ playerField: [] }, () => {
					this.displayPassTurn();
				});

			this.updateNextTurn();
		}
	}

	updateField(cards) {
		if (this.state.turn === 'opponentLeft')
			this.setState({ opponentLeftField: [] }, () => {
				this.setState({ opponentLeftField: cards });
			});
		if (this.state.turn === 'opponentTop')
			this.setState({ opponentTopField: [] }, () => {
				this.setState({ opponentTopField: cards });
			});
		if (this.state.turn === 'opponentRight')
			this.setState({ opponentRightField: [] }, () => {
				this.setState({ opponentRightField: cards });
			});
		if (this.state.turn === 'player')
			this.setState({ playerField: [] }, () => {
				this.setState({ playerField: cards });
			});
	}

	updateNextTurn() {
		if (this.isGameOver()) return;
		setTimeout(() => {
			if (this.state.turn === 'player') {
				this.setState({ turn: 'opponentRight', playerFieldText: '' }, () => {
					this.AIplayCards();
				});
			} else if (this.state.turn === 'opponentRight') {
				this.setState({ turn: 'opponentTop' }, () => {
					this.AIplayCards();
				});
			} else if (this.state.turn === 'opponentTop') {
				this.setState({ turn: 'opponentLeft' }, () => {
					this.AIplayCards();
				});
			} else this.setState({ turn: 'player' });
		}, 1200);
	}

	playerPassTurn() {
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
			this.displayPassTurn();
			this.updateNextTurn();
		}
	}

	numberSort() {
		let cards = this.state.playerCards;
		Rules.sortCardsValue(cards);

		this.setState({ playerCards: cards });
	}

	suitSort() {
		let cards = this.state.playerCards;
		Rules.sortCardsSuit(cards);

		this.setState({ playerCards: cards });
	}

	isGameOver() {
		let currentPlayerCards = this.getCardsforTurn();
		if (currentPlayerCards.length === 0) {
			console.log('game over');
			let score = this.computePlayerScore();
			this.setState({
				gameOver: true,
				playerScore: score,
			});
			return true;
		}
	}

	computePlayerScore() {
		let len = this.state.playerCards.length;
		return Math.ceil((13 - len) * (100 / 13));
	}

	displayPassTurn() {
		let node = document.createElement('div');
		let nodetext = document.createTextNode('Pass');
		node.append(nodetext);
		node.setAttribute('class', 'gameplayfield-text');

		let field = this.state.turn;
		document.getElementById(field).append(node);
		setTimeout(() => {
			document.getElementById(field).removeChild(node);
		}, 1200);
	}

	render() {
		if (this.state.rules) {
			return (
				<div style={{ display: 'flex' }}>
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
							</div>
						</div>
					</div>
				</div>
			);
		} else if (this.state.gameOver) {
			return (
				<div style={{ display: 'flex' }}>
					<div className="game-container">
						<div className="window-container">
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
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<div style={{ display: 'flex' }}>
					<div className="game-container">
						<div className="game-opponent">
							<div className="game-left">
								<Opponent
									class="opponent-container-left"
									cardClass="computer-side"
									cards={this.state.opponentLeftCards}
								></Opponent>
							</div>
							<div className="game-middle">
								<Opponent
									class="opponent-container-top"
									cardClass="computer-top"
									cards={this.state.opponentTopCards}
								></Opponent>
								<GameplayField
									player={this.state.playerField}
									opponentRight={this.state.opponentRightField}
									opponentLeft={this.state.opponentLeftField}
									opponentTop={this.state.opponentTopField}
									playerFieldText={this.state.playerFieldText}
								></GameplayField>
							</div>
							<div className="game-right">
								<Timer
									initialMinutes={this.state.minutes}
									initialSeconds={this.state.seconds}
									onTimer={this.handleTimer}
								/>
								<Opponent
									class="opponent-container-right"
									cardClass="computer-side"
									cards={this.state.opponentRightCards}
								></Opponent>
							</div>
						</div>
						<Player
							cards={this.state.playerCards}
							playerTurn={this.state.turn === 'player'}
							freeMove={this.state.freeMove}
							playCards={this.playerPlayCards}
							passTurn={this.playerPassTurn}
							turn={this.state.turn}
							numberSort={this.numberSort}
							suitSort={this.suitSort}
							gameOver={this.state.gameOver}
							playerScore={this.state.playerScore}
							resetGame={this.resetGame}
						></Player>
					</div>
				</div>
			);
		}
	}
}

export default Game;
