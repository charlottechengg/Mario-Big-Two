const suitsPath = ["Diamonds", "Clubs", "Hearts", "Spades"]
const valuesPath = ["", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
const suits = ["D", "C", "H", "S"]
const SuiteVal = [1, 2, 3, 4]
const type = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]


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

    return isValidSingle(cards) || isValidPair(cards) || isValidFiveCardPlay(cards)
}



export function isValidSingle(cards) {
    return cards.length === 1
}

export function isValidPair(cards) {
    return cards.length === 2 && cards[0].type === cards[1].type
}

export function isValidFiveCardPlay(cards) {
    if (cards.length !== 5) return false

    return isValidStraight(cards) || isValidFlush(cards) || isValidFullHouse(cards) || isValidFourOfaKind(cards)
}

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

export function getSuitValue(suit) {
    return (suit === "D") ? 1 : (suit === "C") ? 2 : (suit === "H") ? 3 : 4
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
        return a.suiteVal - b.suiteVal
    })
}
