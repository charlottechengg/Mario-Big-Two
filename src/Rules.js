const suits = ["D", "C", "H", "S"]
const type = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

const suitsPath = ["Diamonds", "Clubs", "Hearts", "Spades"]
const valuesPath = ["", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "King", "Queen"]


export function newDeck() {
    let deck = []

    for (let i = 1; i < 14; i++) {
        for (let j = 0; j < 4; j++) {
            let value = (i === 1) ? 14 : (i === 2) ? 15 : i
            let imagePath = "NAP-01_"+ suitsPath[j] + "_"+ valuesPath[i] + ".png"
            let card = {
                type: type[i],
                suit: suits[j],
                value: value,
                imagePath: imagePath
            }
            console.log(imagePath)
            deck.push(card)
        }
    }

    return shuffle(deck)
}

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

export function isValidPlay(cards) {
    if (cards == null) return false
    sortCardsValue(cards)

    return isValidCardPairing(cards) || isValidFiveCardPlay(cards)
}

export function isValidCardPairing(cards) {
    return (cards.length === 1) || (cards.length === 2 && cards[0].type === cards[1].type)
}

export function isValidFiveCardPlay(cards) {
    if (cards.length !== 5) return false

    return isStraight(cards) || isFlush(cards) || isFullHouse(cards) || isFourOfAKind(cards)
}

function isStraight(cards) {
    let values = getCardValueArray(cards)

    // Ace straight
    if (values.includes(14)) {
        return (values.includes(10) && values.includes(11) && values.includes(12) && values.includes(13)) || (values.includes(3) && values.includes(4) && values.includes(5) && values.includes(15))
    } else if (values.includes(15)) {
        return (values.includes(3) && values.includes(4) && values.includes(5) && values.includes(6))
    } else {
        for (let i = 1; i < 5; i++) {
            if (values[i] - values[i - 1] !== 1) return false
        }
        return true
    }

}

function isFlush(cards) {
    for (let i = 1; i < 5; i++) {
        if (cards[i].suit !== cards[0].suit) return false
    }
    return true
}

function isFullHouse(cards) {
    let values = getCardValueArray(cards)
    return values[0] === values[1] && values[3] === values[4] && (values[2] === values[1] || values[2] === values[3])
}

function isFourOfAKind(cards) {
    let values = getCardValueArray(cards)
    return (values[0] === values[1] && values[0] === values[2] && values[0] === values[3]) || (values[4] === values[1] && values[4] === values[2] && values[4] === values[3])
}

export function isStrongerPlay(lastTurn, cards) {
    if (lastTurn.length !== cards.length) return false

    switch (cards.length) {
        case 1:
            return isStrongerSingle(lastTurn, cards)
        case 2:
            return isStrongerPair(lastTurn, cards)
        case 5:
            let lastRank = getFiveCardRanking(lastTurn)
            let currRank = getFiveCardRanking(cards)
            if (lastRank < currRank) {
                return true
            } else if (lastRank === currRank) {
                return isStrongerFiveCardPlay(lastTurn, cards)
            }
            break;
        default:
            return false
    }

}

export function isStrongerSingle(lastTurn, card) {
    return getTotalCardValue(card) > getTotalCardValue(lastTurn)
}

export function isStrongerPair(lastTurn, cards) {
    let totalCardValue = getTotalCardValue(cards[0]) + getTotalCardValue(cards[1])
    let totalLastTurnValue = getTotalCardValue(lastTurn[0]) + getTotalCardValue(lastTurn[1])

    return totalCardValue > totalLastTurnValue
}

export function isStrongerFiveCardPlay(lastTurn, cards) {
    sortCardsValue(lastTurn)
    sortCardsValue(cards)
    let ranking = getFiveCardRanking(cards)
    return (ranking === 1) ? isStrongerStraight(lastTurn, cards) : (ranking === 2) ? isStrongerFlush(lastTurn, cards) : (ranking === 3) ? isStrongerFullHouse(lastTurn, cards) : isStrongerFourOfAKind(lastTurn, cards)
}

export function isStrongerStraight(lastTurn, cards) {
    let lastVals = getCardValueArray(lastTurn)
    let currVals = getCardValueArray(cards)
    if (lastVals.includes(15) && !currVals.includes(15)) {
        return true
    } else if(currVals.includes(15) && !lastVals.includes(15)){
        return false
    }
     else {
        return lastVals.pop() <= currVals.pop()
    }
}

export function isStrongerFlush(lastTurn, cards) {
    let lastSuit = getSuitValue(lastTurn[0].suit)
    let currSuit = getSuitValue(cards[0].suit)

    if (lastSuit === currSuit) {
        return lastTurn[4].value < cards[4].value
    } else {
        return lastSuit < currSuit
    }
}

export function isStrongerFullHouse(lastTurn, cards) {
    return lastTurn[2].value < cards[2].value
}

export function isStrongerFourOfAKind(lastTurn, cards) {
    return lastTurn[2].value < cards[2].value
}

export function getFiveCardRanking(cards) {
    if (isValidFiveCardPlay(cards)) {
        return (isStraight(cards) && isFlush(cards)) ? 5 : isStraight(cards) ? 1 : isFlush(cards) ? 2 : isFullHouse(cards) ? 3 : 4
    }
}

export function setUserCards(deck) {
    let userCards = []
    for (let i = 0; i < 13; i++) {
        userCards.push(deck.pop())
    }
    return userCards
}

export function setFirstTurn(playerCards, opponentLeftCards, opponentTopCards, opponentRightCards) {
    let turn
    playerCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "player"
    })

    opponentLeftCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "opponentLeft"
    })

    opponentTopCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "opponentTop"
    })

    opponentRightCards.forEach((card) => {
        if (card.suit === "D" && card.value === 3) turn = "opponentRight"
    })
    return turn
}

function getCardValueArray(cards) {
    let values = []
    cards.forEach((card) => {
        values.push(card.value)
    })
    return values
}

export function getSuitValue(suit) {
    return (suit === "D") ? 1 : (suit === "C") ? 2 : (suit === "H") ? 3 : 5
}

function getTotalCardValue(card) {
    if (card[0]) {
        return card[0].value * 10 + getSuitValue(card[0].suit)
    } else {
        return card.value * 10 + getSuitValue(card.suit)
    }
}

export function sortCardsValue(cards) {
    if (cards == null) return

    cards.sort((a, b) => {
        return a.value - b.value
    })
}

export function sortCardsSuit(cards) {
    if (cards == null) return

    cards.sort((a, b) => {
        return getSuitValue(a.suit) - getSuitValue(b.suit)
    })
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}