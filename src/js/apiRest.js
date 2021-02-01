//Load records from server
function loadRecords() {
    if (isOnline) {
        $.ajax({
            method: "GET",
            url: origin + '/records/'
        }).done(function (result) {
            records = result;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error")
        })
    }
}

//Load players from server
function loadPayers() {
    if (isOnline) {
        $.ajax({
            method: "GET",
            url: origin + '/players/'
        }).done(function (result) {
            players = result;
            //https://stackoverflow.com/questions/23921683/javascript-move-an-item-of-an-array-to-the-front
            players.sort(function (x, y) { return x.nick == player.nick ? -1 : y.nick == player.nick ? 1 : 0; });
            for (const p of players) {
                if (friend && friend.name == p.name) { friendIsOnline = true; break; }
            }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("Error")
        })
    }
}

//Create record in server
function createRecord(name1, name2, score) {
    if (isOnline) {
        let record = {
            nombre1: name1,
            nombre2: name2,
            puntuacion: score
        };

        $.ajax({
            method: "POST",
            url: origin + '/records/',
            data: JSON.stringify(record),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (recordReceived) {
            console.log("Record created: " + JSON.stringify(recordReceived));
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("No ha creado el record")
        })
    }
}

//Join the server
function joinGame(doneFunc, failFunc) {
    if (!joining) {
        joining = true;
        console.log("Conectando con: " + origin)
        $.ajax({
            method: "POST",
            url: origin + '/join/',
            data: JSON.stringify(player),
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (hasJoined) {
            if (hasJoined) {
                console.log("Conectado correctamente a: " + origin);
                ConnectWebSocket();
            } else {
                console.log("Ya existe un usuario con ese nombre en: " + origin);
            }
            joined = hasJoined;
            isOnline = hasJoined;
            if (doneFunc) { doneFunc(); }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("No se ha podido conectar con: " + origin);
            if (failFunc) { failFunc(); }
        }).always(function () {
            joining = false;
        })
    }
}

//Check player connection
function checkPlayer() {
    if (isOnline) {
        $.ajax({
            method: "POST",
            url: origin + '/check/',
            data: JSON.stringify(player),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (hasChecked) {
            isOnline = hasChecked;
        }).fail(function () {
            isOnline = false;
        })
    }
}

function checkChat() {
    if (isOnline) {
        $.ajax({
            method: "GET",
            url: origin + '/chats/'
        }).done(function (chatHistory) {
            chats = chatHistory;
            if (currentScene.sceneIdx >= 0) {
                currentScene.DrawMessages();
            }
        })
    }
}

function createChat(value, scene, x, y) {
    if (isOnline) {
        let chat = { playerNick: player.nick, scene: scene, value: value, date: new Date(), x: x, y: y };
        $.ajax({
            method: "POST",
            url: origin + '/chats/',
            data: JSON.stringify(chat),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function () {
        })
    }
}

let checkServerWait = 1000;
//Check players every x seconds
function checkServer() {
    if (isOnline) {
        if (new Date() - lastTimeChecked > checkServerWait) {
            lastTimeChecked = new Date();
            checkPlayer();
            loadPayers();
            checkChat();
        }
        if (pConnection && pConnection.readyState == 1 && inGame && gameMode == 2) { SendPlayerInfo(currentScene.player0); }
    } else if (gameMode == 2) {
        if (new Date() - lastTimeChecked > checkServerWait) {
            lastTimeChecked = new Date();
            joinGame();
            console.log("Rejoining...");
        }
    }
}
