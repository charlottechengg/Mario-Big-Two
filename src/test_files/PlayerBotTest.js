const PlayerBot = require('../src/PlayerBot');

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

let cards = [deck[0], deck[1], deck[2], deck[3], deck[4], deck[5], deck[6], deck[7]]

describe("PlayerBot tests", () => {

    test('Test for BotPlayCards', () => {
        
        var lastSingle = [deck[8]]
        var lastPair = [deck[8], deck[9]]
        var lastFive = [deck[8], deck[9], deck[10], deck[11], deck[12]]
        var resultSingle = PlayerBot.BotPlayCards(cards,lastSingle)
        var resultPair = PlayerBot.BotPlayCards(cards, lastPair)
        var resultFive = PlayerBot.BotPlayCards(cards,lastFive)
        //expect(result).toBe(expectedResult)
        expect(resultSingle).toBe([deck[0]])
        expect(resultPair).toBe(deck[0], deck[1])
        expect(resultFive).toBe(deck[0], deck[1], deck[2], deck[3], deck[4])
    });

    test('Test for BotStartingTurn', () => {
        var cards2 = [deck[8], deck[0], deck[1], deck[2]]
        var result = PlayerBot.BotStartingTurn(cards2)
        expect(result).toBe([deck[8]])
    });

    test('Test for BotFreeTurn', () => {
        var cards2 = [deck[8], deck[0], deck[1], deck[2]]
        var result = PlayerBot.BotFreeTurn(cards2)
        expect(result).toBe([deck[8]])
    });

    test('Test for BotSelectSingle', () => {
        var cards2 = [deck[0], deck[1], deck[2]]
        var last = [deck[8]]
        var result = PlayerBot.BotSelectSingle(cards2, last)
        expect(result).toBe([deck[0]])
    });

    test('Test for BotSelectPair', () => {
        var cards2 = [deck[0], deck[1], deck[2]]
        var last = [deck[8], deck[9]]
        var result = PlayerBot.BotSelectPair(cards2, last)
        expect(result).toBe([deck[0], deck[1]])
    });

    test('Test for BotSelectFive', () => {
        var last = [deck[8], deck[9], deck[10], deck[11], deck[12]]
        var result = PlayerBot.BotSelectFive(cards, last)
        expect(result).toBe([deck[0], deck[1], deck[2], deck[3], deck[4]])
    });

    test('Test for getAllFiveCards', () => {
        var cards2 = [deck[0], deck[1], deck[2], deck[3], deck[4]]
        var result = PlayerBot.getAllFiveCards(cards2)
        expect(result).toBe(cards2)
    });

    test('Test for getAllPairs', () => {
        var cards2 = [deck[0], deck[1]]
        var result = PlayerBot.getAllPairs(cards2)
        expect(result).toBe(cards2)
    });
})