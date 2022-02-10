const Rules = require('../src/Rules');

let deck = []
const suitsPath = ["Diamonds", "Clubs", "Hearts", "Spades"]
const valuesPath = ["", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]
const suits = ["D", "C", "H", "S"]
const SuiteVal = [1, 2, 3, 4]
const type = ["", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]

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

describe("Rules tests", () => {

    test('Test for newDeck', () => {
        
        let Deck = newDeck()
        expect(Deck.length).toBe(52)
    });

    test('Test for shuffle', () => {
        let cards = [deck[0], deck[1]]
        let shuffle_card = shuffle(cards)
        let expected = [deck[1], deck[0]]
        expect(shuffle_card).toBe(expected)
    });

    test('Test for isValidStartingPlay', () => {
        let cards1 = [deck[3]]//contains Diamond 3
        let cards2 = [deck[0]]
        let expect1 = isValidStartingPlay(cards1)        
        let expect2 = isValidStartingPlay(cards2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(false)
    });

    test('Test for isValidPlay', () => {
        let cards1 = [deck[0], deck[1]]
        let cards2 = [deck[0]]
        let cards3 = [deck[0], deck[13]]
        let cards4 = [deck[0],deck[1],deck[2],deck[3],deck[4]]
        let expect1 = isValidPlay(cards1)
        let expect2 = isValidPlay(cards2)
        let expect3 = isValidPlay(cards3)
        let expect4 = isValidPlay(cards4)
        expect(expect1).toBe(false)
        expect(expect2).toBe(true)
        expect(expect3).toBe(true)
        expect(expect4).toBe(true)
    });

    test('Test for isValidSingle', () => {
        let cards1 = [deck[0]]
        let cards2 = [deck[0], deck[2]]
        let expect1 = isValidSingle(cards1)
        let expect2 = isValidSingle(cards2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(false)
    });

    test('Test for isValidPair', () => {
        let cards1 = [deck[0], deck[13]]
        let cards2 = [deck[0]]
        let expect1 = isValidPair(cards1)
        let expect2 = isValidPair(cards2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(false)
    });

    test('Test for isValidFiveCardPlay', () => {
        let cards1 = [deck[0], deck[13]]
        let cards2 = [deck[0],deck[1],deck[2],deck[3],deck[4]]
        let expect1 = isValidFiveCardPlay(cards1)
        let expect2 = isValidFiveCardPlay(cards2)
        expect(expect1).toBe(false)
        expect(expect2).toBe(true)
    });

    test('Test for isValidStraight', () => {
        let cards1 = [deck[0], deck[13]]
        let cards2 = [deck[0],deck[1],deck[2],deck[3],deck[4]]
        let expect1 = isValidStraight(cards1)
        let expect2 = isValidStraight(cards2)
        expect(expect1).toBe(false)
        expect(expect2).toBe(true)
    });

    test('Test for isValidFlush', () => {
        let cards1 = [deck[0], deck[13]]
        let cards2 = [deck[0],deck[1],deck[2],deck[3],deck[4]]
        let expect1 = isValidFlush(cards1)
        let expect2 = isValidFlush(cards2)
        expect(expect1).toBe(false)
        expect(expect2).toBe(true)
    });

    test('Test for isValidFullHouse', () => {
        let cards1 = [deck[0], deck[13]]
        let cards2 = [deck[0],deck[13],deck[26],deck[3],deck[16]]
        let expect1 = isValidFullHouse(cards1)
        let expect2 = isValidFullHouse(cards2)
        expect(expect1).toBe(false)
        expect(expect2).toBe(true)
    });

    test('Test for isValidFourOfaKind', () => {
        let cards1 = [deck[0], deck[13]]
        let cards2 = [deck[0],deck[13],deck[26],deck[39],deck[16]]
        let expect1 = isValidFourOfaKind(cards1)
        let expect2 = isValidFourOfaKind(cards2)
        expect(expect1).toBe(false)
        expect(expect2).toBe(true)
    });

    test('Test for isStrongerPlay', () => {
        let last1 = [deck[0]]
        let last2 = [deck[0], deck[13]]
        let select1 = [deck[1]]
        let select2 = [deck[1], deck[14]]
        let expect1 = isStrongerSingle(last1, select1)
        let expect2 = isStrongerSingle(last2, select2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(true)
    });

    test('Test for isStrongerSingle', () => {
        let last = [deck[0]]
        let select1 = [deck[1]]
        let select2 = [deck[2]]
        let expect1 = isStrongerSingle(last, select1)
        let expect2 = isStrongerSingle(last, select2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(false)
    });

    test('Test for isStrongerPair', () => {
        let last = [deck[0], deck[13]]
        let select1 = [deck[1], deck[14]]
        let select2 = [deck[2], deck[15]]
        let expect1 = isStrongerPair(last, select1)
        let expect2 = isStrongerPair(last, select2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(false)
    });

    test('Test for isStrongerFive', () => {
        let last = [deck[0],deck[1],deck[2],deck[3],deck[4]]
        let select1 = [deck[1],deck[14],deck[27],deck[2],deck[15]]
        let select2 = [deck[3],deck[4],deck[5],deck[6],deck7]
        let expect1 = isValidFiveCardPlay(last, select1)
        let expect2 = isValidFiveCardPlay(last, select2)
        expect(expect1).toBe(true)
        expect(expect2).toBe(false)
    });

    test('Test for setFirstTurn', () => {
        let player = [deck[0]]
        let left = [deck[1]]
        let top = [deck[2]]
        let right = [deck[3]]
        let turn = setFirstTurn(player, left, top, right)
        let expected = 'top'
        expect(turn).toBe(expected)
    });

    test('Test for getCardsValue', () => {
        let suit = 'D'
        let val = getCardsValue(suit)
        let expected = 1
        expect(val).toBe(expected)
    });

})