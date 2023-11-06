function rollDice() {
    for (let i=0; i<(5 - model.game.runtime.heldDice.length); i++) {
        model.game.runtime.dice[i] = Math.floor(Math.random()*6+1)
    }
    model.game.runtime.rollCount++;
    debugLog("roll count: "+model.game.runtime.rollCount)
    if (model.game.runtime.rollCount >= 3) {
        disableButton(false);
    }
    updateViewGame();
}

function holdDie(index) {
    const runtime = model.game.runtime;
    const dieNum = runtime.dice[index];
    runtime.heldDice.push(dieNum);
    runtime.dice.splice(index, 1);
    updateViewGame();
}

function releaseDie(index) {
    const runtime = model.game.runtime;
    const dieNum = runtime.heldDice[index];
    runtime.dice.push(dieNum);
    runtime.heldDice.splice(index, 1);
    updateViewGame();
}

function getFrequencyTable() {
    let freqTable = [0,0,0,0,0,0];
    let combinedDice = [...model.game.runtime.dice, ...model.game.runtime.heldDice];
    
    for (let i=0; i<5; i++) {
        freqTable[combinedDice[i]-1]++
    }

    return freqTable
}

function enableButton(update) {
    model.game.runtime.buttonEnabled = true;
    if (update) updateViewGame();
}

function disableButton(update) {
    model.game.runtime.buttonEnabled = false;
    if (update) updateViewGame();
}

function debug() {
    model.app.debugOn = !model.app.debugOn;
    updateViewGame();
}

function debugLog(log) {
    model.app.debugLog += log + "<br/>"   
}

function getScore(place) {
    const freqTable = getFrequencyTable();

    if (place === "ones") return freqTable[0];
    if (place === "twos") return freqTable[1] * 2;
    if (place === "threes") return freqTable[2] * 3;
    if (place === "fours") return freqTable[3] * 4;
    if (place === "fives") return freqTable[4] * 5;
    if (place === "sixes") return freqTable[5] * 6;

    if (place === "onePair") {
        if (freqTable.includes(2)) return (freqTable.lastIndexOf(2) + 1) * 2;
        return 0;
    }
    if (place === "twoPairs") {
        if (freqTable.indexOf(2) != freqTable.lastIndexOf(2)) {
            return (freqTable.lastIndexOf(2) + 1) * 2 + (freqTable.indexOf(2) + 1) * 2;
        }
        if (freqTable.indexOf(3) != freqTable.indexOf(2)) {
            return (freqTable.indexOf(3) + 1) * 2 + (freqTable.indexOf(2) + 1) * 2;
        }
        return 0;
    }
    if (place === "threeAlike") {
        if (freqTable.includes(3)) return (freqTable.lastIndexOf(3) + 1) * 3;
        return 0;
    }
    if (place === "fourAlike") {
        if (freqTable.includes(4)) return (freqTable.lastIndexOf(4) + 1) * 4;
        return 0;
    }
    if (place === "smallStraight") {
        if (JSON.stringify(freqTable) === "[1,1,1,1,1,0]") return 15;
        return 0;
    }
    if (place === "bigStraight") {
        if (JSON.stringify(freqTable) === "[0,1,1,1,1,1]") return 20;
        return 0;
    }
    if (place === "house") {
        if (freqTable.includes(2) && freqTable.includes(3)) {
            return (freqTable.indexOf(3) + 1) * 3 + (freqTable.indexOf(2) + 1) * 2;
        }
        return 0;
    }
    if (place === "chance") {
        let combinedDice = [...model.game.runtime.dice, ...model.game.runtime.heldDice];
        return combinedDice.reduce((a, b) => a + b, 0);
    }
    if (place === "yatzy") {
        if (freqTable.includes(5)) return 50;
        return 0;
    }
        
    return "wrong parameter"
}

function setScore(place) {
    type = "ones, twos, threes, fours, fives, sixes".includes(place) ? 'numbers' : 'specials';
    model.game.runtime.players[model.game.runtime.currentPlayer].setScore(type, place, getScore(place))
    updateViewGame();
}