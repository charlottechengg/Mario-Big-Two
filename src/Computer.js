import * as Rules from './Rules.js'

export function AIplayCards(cards, lastMove) {

    Rules.sortCardsValue(cards)
    Rules.sortCardsValue(lastMove)
    let selectedCards

    switch (lastMove.length) {
        
        case 1:
            selectedCards = AIselectSingleCard(cards, lastMove)
            break;
        case 2:
            selectedCards = AIselectPair(cards, lastMove)
            break;
        case 5:
            selectedCards = AIselectFiveCardPlay(cards, lastMove)
            break;
        default:
    }
    return selectedCards
}

export function AIplayStartingTurn(cards) {
    console.log(cards)
    console.log("starting turn")
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].value === 3 && cards[i].suit === "D") return [cards[i]]
    }
}

export function AIplayFreeMove(cards) {
    Rules.sortCardsValue(cards)

    let selectedCards = getAllFiveCardPlays(cards)
    if (selectedCards !== null && selectedCards.length !== 0) return selectedCards[0]
    selectedCards = getAllPairs(cards)
    if (selectedCards !== null && selectedCards.length !== 0) return selectedCards[0]

    return [cards[0]]
}

export function AIselectSingleCard(cards, lastMove) {


    for (let i = 0; i < cards.length; i++) {
        if (Rules.isStrongerSingle(lastMove[0], cards[i])) {
            return [cards[i]]
        }

    }

    return null
}

export function AIselectPair(cards, lastMove) {
    let pairs = getAllPairs(cards)

    if (pairs) {
        for (let i = 0; i < pairs.length; i++) {
            if (Rules.isStrongerPair(lastMove, pairs[i])) {
                return pairs[i]
            }
        }
    }
    return null
}

export function AIselectFiveCardPlay(cards, lastMove) {
    let validSet = getAllFiveCardPlays(cards)

    if (validSet) {
        for (let i = 0; i < validSet.length; i++) {
            if (Rules.isStrongerPlay(lastMove, validSet[i])) {
                return validSet[i]
            }
        }
    }
    return null
}

function getAllFiveCardPlays(cards) {
    if (cards.length < 5) return null

    let validSet = []

    function getAllFiveCardPlaysHelper(cards, subset, i) {
        if (i === cards.length) {
            subset = subset.filter(card => card !== null)
            subset = subset.slice(0, 5)
            if (Rules.isValidFiveCardPlay(subset)) {
                validSet.push(subset)
            }
            return
        }

        subset[i] = cards[i]
        getAllFiveCardPlaysHelper(cards, subset, i + 1)
        subset[i] = null
        getAllFiveCardPlaysHelper(cards, subset, i + 1)
    }
    getAllFiveCardPlaysHelper(cards, [], 0)

    return validSet

}

function getAllPairs(cards) {
    let seenCards = new Map()
    let pairs = []
    for (let i = 0; i < cards.length; i++) {
        if (seenCards.has(cards[i].type)) {
            let lastSeenCard = seenCards.get(cards[i].type)
            pairs.push([lastSeenCard, cards[i]])
        } else {
            seenCards.set(cards[i].type, cards[i])
        }
    }

    return pairs
}