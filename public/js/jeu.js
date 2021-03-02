let canvas, ctx, mousePos;


// Autres joueurs
let allPlayers = {};

function startGame() {
    console.log("init");
    canvas = document.querySelector("#myCanvas");
    ctx = canvas.getContext('2d');

    // Les écouteurs
    canvas.addEventListener("mousedown", traiteMouseDown);
    canvas.addEventListener("mousemove", traiteMouseMove);

    requestAnimationFrame(animationLoop);

}

function traiteMouseDown(evt) {
    console.log("mousedown");
}

function traiteMouseMove(evt) {
    console.log("mousemove");

    mousePos = getMousePos(canvas, evt);
    //console.log(mousePos.x + " " + mousePos.y); 

    allPlayers[username].x = mousePos.x;
    allPlayers[username].y = mousePos.y; 

    console.log("On envoie sendPos");
    let pos = {'user':username, 'pos':mousePos}
    socket.emit('sendpos', pos);
}

function updatePlayerNewPos(newPos) {
    allPlayers[newPos.user].x = newPos.pos.x;
    allPlayers[newPos.user].y = newPos.pos.y;
}

// Mise à jour du tableau quand un joueur arrive
// ou se deconnecte
function updatePlayers(listOfPlayers) {
    allPlayers = listOfPlayers;
}

function drawPlayer(player) {
    // Obligé sinon les cercles ne sont pas clear
    ctx.beginPath();
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 10;
    ctx.arc(player.x, player.y, 50, 0, 2 * Math.PI);
    ctx.stroke();
}

function drawAllPlayers() {
    for(let name in allPlayers) {
        drawPlayer(allPlayers[name]);
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
    };
}

function animationLoop() {
    if(username != undefined ) {
        // 1 On efface l'écran
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 2 On dessine des objets
        drawAllPlayers();
    }

    // 3 On rappelle la fonction d'animation à 60 im/s
    requestAnimationFrame(animationLoop);
}