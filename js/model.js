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
            "ones", "twos", "threes", "fours", "fives", "sixes",
            "onePair", "twoPairs", "threeAlike", "fourAlike",
            "smallStraight", "bigStraight", "house", "chance", "yatzy",
        ]
    },
};

class Player {
    constructor(name) {
        this.name = name;
        this.score = {
            numbers: {
                ones: 0,
                twos: 0,
                threes: 0,
                fours: 0,
                fives: 0,
                sixes: 0,
            },
            numSum: 0,
            bonus: 0,

            specials: {
                onePair: 0,
                twoPairs: 0,
                threeAlike: 0,
                fourAlike: 0,
                smallStraight: 0,
                bigStraight: 0,
                house: 0,
                chance: 0,
                yatzy: 0,
            },

            totSum: 0,
        }
    }

    getScore() {
        return this.score;
    }
    setScore(type, name, value) {
        //check if type is correct
        //if (type !== "numbers" && type !== "specials") return "wrong type";

        //check if name is correct
        // let nameCorrect = false;
        // for (let value in this.score.numbers) {
        //     if (value === name) nameCorrect = true;
        // }
        // if (!nameCorrect) return "wrong name";

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
