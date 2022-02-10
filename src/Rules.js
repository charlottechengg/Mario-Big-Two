/** 
 * @file Rules.js
 * @description This file contains rules of BigTwo game.
 * @author Jiaxin Tang
 * @version Latest edition on April 11, 2021
 */ 

const suitsPath = ["Diamonds", "Clubs", "Hearts", "Spades"]
const valuesPath = ["", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
const suits = ["D", "C", "H", "S"]
const SuiteVal = [1, 2, 3, 4]
const type = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

/**
 * @function newDeck
 * @description A function that generates a deck of 52 cards, and rearranges the order of cards in the deck
 * @returns {card[]} deck - with cards in random order
 */
export function newDeck() {
    let deck = []

    for (let i = 1; i < 14; i++) {
        for (let j = 0; j < 4; j++) {
            let value = (i === 1) ? 14 : (i === 2) ? 15 : i
            let imagePath = "NAP-01_"+ suitsPath[j] + "_"+ valuesPath[i] + ".png"
            let card = {
                type: type[i],
                suit: suits[j],
                suiteVal : SuiteVal[j],
                value: value,
                imagePath: imagePath
            }
            deck.push(card)
        }
    }

    return shuffle(deck)
}

/**
 * @function shuffle
 * @description A function that rearranges the order of cards in the given deck
 * @param {card[]} deck - a list of cards
 * @returns {card[]} deck - with cards in random order
 */

function shuffle(deck) {
    var temp, i, j;
    for (i = deck.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    return deck;
}

/**
 * @function isValidStartingPlay
 * @description A function that checks if the current play is valid starting play
 * @param {card[]} cards - the cards that current player has
 * @returns {boolean} = true if cards contain Diamond 3
 */
export function isValidStartingPlay(cards) {
    let containsThreeOfDiamonds

    cards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) containsThreeOfDiamonds = true
    })

    if (containsThreeOfDiamonds) {
        return isValidPlay(cards)
    } else {
        return false
    }
}

/**
 * @function isValidSPlay
 * @description A function that checks if the current play is valid play
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if is valid play
 */

export function isValidPlay(cards) {
    if (cards == null) return false
    sortCardsValue(cards)

    return isValidSingle(cards) || isValidPair(cards) || isValidFiveCardPlay(cards)
}


/**
 * @function isValidSingle
 * @description A function that checks if the current play is valid single play
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards contain a single card
 */
export function isValidSingle(cards) {
    return cards.length === 1
}

/**
 * @function isValidPair
 * @description A function that checks if the current play is valid pair
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards is a valid pair
 */
export function isValidPair(cards) {
    return cards.length === 2 && cards[0].type === cards[1].type
}

/**
 * @function isValidFiveCardPlay
 * @description A function that checks if the current play is valid five card play
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards is a valid combination of five cards
 */
export function isValidFiveCardPlay(cards) {
    if (cards.length !== 5) return false

    return isValidStraight(cards) || isValidFlush(cards) || isValidFullHouse(cards) || isValidFourOfaKind(cards)
}

/**
 * @function isValidStraight
 * @description A function that checks if the current play is valid straight
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards is a valid straight
 */
function isValidStraight(cards) {
    if(cards.length !== 5)
        return false
    //12345 
    sortCardsValue(cards)
    if(cards[0].value === 14){
        if(cards[1].value === 15 && cards[2].value === 3 &&
            cards[3].value === 4 && cards[4].value === 5 )
                return true
        else
            return false
    }
    //23456
    if(cards[0].value === 15){
        if(cards[1].value === 3 && cards[2].value === 4 &&
            cards[3].value === 5 && cards[4].value === 6 )
                return true
        else
            return false
    }
    var flag = true
    for(var i = 0; i < 4; i++){
        if((cards[i].value + 1) !== cards[i+1].value){
            flag = false
            return flag
        }
    }
    return flag
}

/**
 * @function isValidFlush
 * @description A function that checks if the current play is valid flush
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards is a valid flush
 */
function isValidFlush(cards) {
    if(cards.length !== 5)
        return false
    var flag = true
    for(var i = 1; i < 5; i++){
        if(cards[i].suiteVal !== cards[0].suiteVal){
            flag = false
            return flag
        }
    }
    return flag
}

/**
 * @function isValidFullHouse
 * @description A function that checks if the current play is valid fullhouse
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards is a valid fullhouse
 */
function isValidFullHouse(cards) {
    if(cards.length !== 5)
        return false
    sortCardsValue(cards)
    if(cards[0].value === cards[1].value && cards[0].value === cards[2].value &&
        cards[3].value === cards[4].value)
        return true
    if(cards[0].value === cards[1].value && cards[2].value === cards[3].value &&
        cards[2].value === cards[4].value)
        return true  
    return false}

/**
 * @function isValidFourOfaKind
 * @description A function that checks if the current play is valid four of a kind
 * @param {card[]} cards - the cards that current player selects
 * @returns {boolean} - true if cards is a valid four of a kind 
 */
function isValidFourOfaKind(cards) {
     if(cards.length !== 5)
        return false
    sortCardsValue(cards)
    if(cards[0].value === cards[1].value && cards[0].value === cards[2].value &&
        cards[0].value === cards[3].value)
        return true
    if(cards[4].value === cards[1].value && cards[4].value === cards[2].value &&
        cards[4].value === cards[3].value)
        return true  
    return false
}

/**
 * @function isStrongerPlay
 * @description A function that checks if the current play is stronger than last play
 * @param {card[]} last - the cards that the last player plays
 * @param {card[]} select - the cards that current player selects
 * @returns {boolean} - true if the select play is stronger than last play
 */
export function isStrongerPlay(last, select) {
    var n = select.length
    if(n !== last.length)
        return false
    switch(n){
        case 1: return isStrongerSingle(last, select);
        case 2: return isStrongerPair(last, select);
        case 5: return isStrongerFive(last, select);
        default:
            return false
    }
}

/**
 * @function isStrongerSingle
 * @description A function that checks if the current single is stronger than last single
 * @param {card[]} last - the cards that the last player plays
 * @param {card[]} select - the cards that current player selects
 * @returns {boolean} - true if the select play is stronger than last play
 */
export function isStrongerSingle(last, select){
    if(select[0] && last[0]){
        if(select[0].value > last[0].value)
            return true
        if(select[0].value === last[0].value && select[0].suiteVal > last[0].suiteVal)
            return true
    }else if(select[0] && !last[0]){
        if(select[0].value > last.value)
            return true
        if(select[0].value === last.value && select[0].suiteVal > last.suiteVal)
            return true
    }else if(!select[0] && !last[0]){
        if(select.value > last.value)
            return true
        if(select.value === last.value && select.suiteVal > last.suiteVal)
            return true
    }else if(!select[0] && last[0]){
        if(select.value > last[0].value)
            return true
        if(select.value === last[0].value && select.suiteVal > last[0].suiteVal)
            return true
    }
    return false
}

/**
 * @function isStrongerPair
 * @description A function that checks if the current pair is stronger than last pair
 * @param {card[]} last - the cards that the last player plays
 * @param {card[]} select - the cards that current player selects
 * @returns {boolean} - true if the select play is stronger than last play
 */
export function isStrongerPair(last, select){
    if(!isValidPair(select))
        return false
    if(select[0].value > last[0].value)
        return true
    sortCardsSuit(select)
    sortCardsSuit(last)
    if(select[0].value === last[0].value && select[1].suiteVal > last[1].suiteVal)
        return true
    return false
}

/**
 * @function isStrongerFive
 * @description A function that checks if the current five card play is stronger than last five card play
 * @param {card[]} last - the cards that the last player plays
 * @param {card[]} select - the cards that current player selects
 * @returns {boolean} - true if the select play is stronger than last play
 */
export function isStrongerFive(last, select){
    if(isValidFourOfaKind(select) && isValidFullHouse(last))
        return true
    if(isValidFourOfaKind(select) && isValidFlush(last))
        return true
    if(isValidFourOfaKind(select) && isValidStraight(last))
        return true
    if(isValidFullHouse(select) && isValidFlush(last))
        return true
    if(isValidFullHouse(select) && isValidStraight(last))
        return true
    if(isValidFlush(select) && isValidStraight(last))
        return true 
    if(isValidStraight(select) && isValidStraight(last)){
        sortCardsValue(select)
        sortCardsValue(last)
        if(select[4].value > last[4].value)
            return true
        else
            return false
    }
    if(isValidFlush(select) && isValidFlush(last)){
        sortCardsValue(select)
        sortCardsValue(last)
        if(select[0].suiteVal > last[0].suiteVal)
            return true
        if(select[0].suiteVal === last[0].suiteVal && select[4].value > last[4].value)
            return true
        return false
    }
    if(isValidFullHouse(select) && isValidFullHouse(last)){
        sortCardsValue(select)
        sortCardsValue(last)
        if(select[3].value > last[3].value)
            return true
        return false
    }
    if(isValidFourOfaKind(select) && isValidFourOfaKind(last)){
        sortCardsValue(select)
        sortCardsValue(last)
        if(select[3].value > last[3].value)
            return true
        return false
    }
}

/**
 * @function setUserCards
 * @description A function that places 13 cards in a deck into a list to be assigned to a player. 
 * @param {card[]} deck - a list of 52 cards in a random order
 * @returns {card[]} userCards - contains 13 cards for a player
 */
export function setUserCards(deck) {
    let userCards = []
    for (let i = 0; i < 13; i++) {
        userCards.push(deck.pop())
    }
    return userCards
}

/**
 * @function setFirstTurn
 * @description A function that decides which player plays the first turn.
 * @param {card[]} playerCards - a list of cards that player has
 * @param {card[]} opponentLeftCards - a list of cards that left AI has
 * @param {card[]} opponentTopCards - a list of cards that top AI has
 * @param {card[]} opponentRightCards - a list of cards that right AI has
 * @returns {string} turn - represeting the initial player
 */
export function setFirstTurn(playerCards, opponentLeftCards, opponentTopCards, opponentRightCards) {
    let turn
    playerCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "player"
    })

    opponentLeftCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "left"
    })

    opponentTopCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "top"
    })

    opponentRightCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "right"
    })
    return turn
}

/**
 * @function getSuitValue
 * @description A function that gets the integer value of the corresponding suit. 
 * @param {string} suit 
 * @returns {int} - integer value related to suit
 */
export function getSuitValue(suit) {
    return (suit === "D") ? 1 : (suit === "C") ? 2 : (suit === "H") ? 3 : 4
}

/**
 * @function sortCardsValue
 * @description A function that sorts the given cards in the number rank order. 
 * @param {card[]} cards
 * @returns {card[]} cards - ordered in the number rank
 */
export function sortCardsValue(cards) {
    if (cards == null) return

    cards.sort((a, b) => {
        return a.value - b.value
    })
}

/**
 * @function sortCardsSuit
 * @description A function that sorts the given cards in the suit rank order. 
 * @param {card[]} cards
 * @returns {card[]} cards - ordered in the suit rank
 */
export function sortCardsSuit(cards) {
    if (cards == null) return

    cards.sort((a, b) => {
        return a.suiteVal - b.suiteVal
    })
}
