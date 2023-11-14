function updateViewGame() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <div class="yatzyContainer">
            <div class="yatzyBlock">${getTableHtml()}</div>
            <div class="diceblocks">${getDiceHtml()}</div>
            <div class="debug">${getDebugHtml()}</div>
        </div>
    `;
}


function getTableHtml() {
    const rowName = model.game.rowNames;
    let tableHtml = "<table>";
    for (let i = 0; i < rowName.length; i++) {
        rowType = i === 0 || i === 7 || i === 8 || i === 18 ? 'th' : 'td';
        tableHtml += /*HTML*/`
            <tr>
                <${rowType}>${rowName[i]}</${rowType}>
                ${getTableCollums(i)}
            </tr>
        `;
    }
    tableHtml += "</table>";
    return tableHtml;
}

function getTableCollums(index) {
    let collumsHtml = "";
    for (let j=0; j<model.game.runtime.players.length; j++) {
        let onclick = index === 0 ? '' : `onclick="setScore('${model.game.rowIds[index]}', ${j})"`;
        collumsHtml += /*HTML*/`
         <${rowType} ${onclick} class="centered">${getCollumContent(index, j)}</${rowType}>
         `
    }
    return collumsHtml;
}

function getCollumContent(index, id) {
    const players = model.game.runtime.players;
    const rowId = model.game.rowIds;
    const numScore = players[id].score.numbers[rowId[index]];
    const spcScore = players[id].score.specials[rowId[index]]
    let content = "Error";
    if (index === 0) content = players[id].name;
    if (index > 0 && index < 7) content = numScore === 0 ? '——' : numScore;
    if (index === 7) content = players[id].score.numSum;
    if (index === 8) content = players[id].score.bonus;
    if (index > 8 && index < 18) content = spcScore === 0 ? '——' : spcScore;
    if (index === 18) content = players[id].score.totSum;

    content = content === null ? '' : content;
    return content;
}


function getDiceHtml() {
    const buttonEnabled = model.game.runtime.buttonEnabled;
    let diceHtml = "";
    diceHtml = /*HTML*/`
        <div class="dieArea">
            <div class="heldDiceContainer">${getHeldDiceSymbols()}</div>
            <div class="diceContainer">${getDiceSymbols()}</div>
        </div>
        <div class="buttonArea">
            <button class="diceButton" onclick="rollDice()" ${buttonEnabled ? '' : 'disabled'}>Kast terninger</button>
        </div>
    `
    return diceHtml;
}

function getHeldDiceSymbols() {
    let index = 0;
    let heldDiceText = "";
    for (let num of model.game.runtime.heldDice) {
        heldDiceText += `<div class="heldDice" onclick="releaseDie(${index})">${model.game.diceMap[num]}</div>`;
        index++;
    }
    return heldDiceText
}

function getDiceSymbols() {
    let index = 0;
    let diceText = "";
    for (let num of model.game.runtime.dice) {
        diceText += `<div class="dice" onclick="holdDie(${index})">${model.game.diceMap[num]}</div>`;
        index++;
    }
    return diceText;
}


function getDebugHtml() {
    let debugHtml = "";
    if (!model.app.debugOn) return debugHtml;
    debugHtml += /*HTML*/`
        <div class="debugWindow">
            ${model.app.debugLog}
        </div>
    `;
    return debugHtml;
}