function addPlayer(name) {
    console.log(name);
    const players = model.game.runtime.players;
    players[players.length] = window['player' + (players.length + 1)] = new Player(name);
    
    updateViewStart();
}

function startGame() {
    console.log('start!')
    model.app.currentPage = "game";
    updateViewGame();
}