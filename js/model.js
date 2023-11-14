model = {
    app: {
        currentPage: "start",
        theme: "light", //har lyst til å implementere
        debugOn: true,
        debugLog: "Debug: <br/>",
    },
    game: {
        runtime: {
            players: [ //Test spiller, skal være tom
                // {
                //     "name": "Mads",
                //     "score": {
                //         "numbers": {
                //             "ones": 1,
                //             "twos": 2,
                //             "threes": 6,
                //             "fours": 4,
                //             "fives": 5,
                //             "sixes": 12,
                //         },
                //         "numSum": 0,
                //         "bonus": 0,
                //         "specials": {
                //             "onePair": 10,
                //             "twoPairs": 9,
                //             "threeAlike": 8,
                //             "fourAlike": 7,
                //             "smallStraight": 6,
                //             "bigStraight": 5,
                //             "house": 4,
                //             "chance": 3,
                //             "yatzy": 2,
                //         },
                //         "totSum": 0,
                //     },
                // },
            ],
            currentPlayer: 0,
            buttonEnabled: true,
            rollCount: 0,
            dice: [],
            heldDice: [],
        },
        diceMap: {
            1:'⚀', 2:'⚁', 3:'⚂', 4:'⚃', 5:'⚄', 6:'⚅'
        },
        //brukes bare til å tegne opp, vil helst unngå ids
        rowNames: [
            "Navn:", "Enere", "Toere", "Treere", "Firere", "Femere", "Seksere",
            "Sum", "Bonus",
            "Ett par", "To par", "Tre like", "Fire like", 
            "Liten straight", "Stor straight", "Hus", "Sjanse", "Yatzy", "Sum",
        ],
        rowIds: [
            "name", "ones", "twos", "threes", "fours", "fives", "sixes",
            "numSum", "bonus",
            "onePair", "twoPairs", "threeAlike", "fourAlike",
            "smallStraight", "bigStraight", "house", "chance", "yatzy", "sum",
        ]
    },
};

class Player {
    constructor(name) {
        this.name = name;
        this.score = {
            numbers: {
                ones: null,
                twos: null,
                threes: null,
                fours: null,
                fives: null,
                sixes: null,
            },
            numSum: 0,
            bonus: null,

            specials: {
                onePair: null,
                twoPairs: null,
                threeAlike: null,
                fourAlike: null,
                smallStraight: null,
                bigStraight: null,
                house: null,
                chance: null,
                yatzy: null,
            },

            totSum: 0,
        }
    }

    getScore() {
        return this.score;
    }
    setScore(type, name, value) {
        this.score[type][name] = value;
        this.updateSums();
    }
    checkBonus() {
        if (this.score.bonus === 50) return;
        for (let value in this.score.numbers) {
            console.log(`nubers value ${value}: ${this.score.numbers[value]}`);
            if (this.score.numbers[value] === 0) {
                console.log("return");
                return;
            }
        }
        console.log("checking over 63")
        if (this.score.numSum >= 63) {
            console.log("adding bonus");
            this.score.bonus = 50;
        }
    }
    updateSums() {
        let sum = 0;
        for (let value in this.score.numbers) {
            sum += this.score.numbers[value];
        }
        this.score.numSum = sum;

        this.checkBonus();

        sum = 0;
        for (let value in this.score.specials) {
            sum += this.score.specials[value];
        }
        this.score.totSum = sum + this.score.numSum + this.score.bonus;
    }
}
