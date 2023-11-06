function updateViewStart() {
    document.getElementById('app').innerHTML = /*HTML*/`
        <h1>Yatzy!</h1>
        <h3>Skriv inn navn</h3>
        ${getPlayerHtml()}
        <br/><br/>
        <button onclick="startGame()" ${model.game.runtime.players.length === 0 ? 'disabled' : ''}>Start spillet!</button>
    `
}

function getPlayerHtml() {
    const playerNum = model.game.runtime.players.length + 1;
    let playerHtml = "";
    for (i = 0; i < model.game.runtime.players.length; i++) {
        playerHtml += /*HTML*/`
            <div>Spiller ${i + 1}: ${model.game.runtime.players[i].name}</div>
        `;
    }

    playerHtml += /*HTML*/`
        <label for="player${playerNum}">Spiller ${playerNum}: </label>
        <input type="text" id="player${playerNum}">
        <button onclick="addPlayer(document.getElementById('player${playerNum}').value)">Legg til spiller</button><br/>
    `;
    return playerHtml;
}