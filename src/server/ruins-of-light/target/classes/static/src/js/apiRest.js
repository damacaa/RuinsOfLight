let lastTimeChecked = new Date();

let records = [];
let players = [];
let player = { nick: null };

let isOnline = false;
let canJoin = false;
let joining = false;

let origin = window.location.origin; //url in browser

//Load records from server
function loadRecords() {
    $.ajax({
        method: "GET",
        url: origin + '/records/'
    }).done(function (result) {
        records = result;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error")
    })
}

//Load players from server
function loadPayers() {
    $.ajax({
        method: "GET",
        url: origin + '/players/'
    }).done(function (result) {
        players = result;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error")
    })
}

//Create record in server
function createRecord(name1, name2, score) {
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

//Join the server
function joinGame(doneFunc, failFunc) {
    if (!joining) {
        joining = true;
        console.log("Conectando con: " + origin)
        $.ajax({
            method: "POST",
            url: origin + '/join/',
            data: JSON.stringify(player),
            processData: false,
            headers: {
                "Content-Type": "application/json"
            }
        }).done(function (hasJoined) {
            //console.log("Join: " + hasJoined);
            canJoin = hasJoined;
            isOnline = hasJoined;
            if (doneFunc) { doneFunc(); }
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log("No se ha podido conectar con: " + origin)
            origin = 'http://localhost:8080'; //if default path doesn't work, try local host
            joining = false;
            joinGame();//if can't join try again
            if (failFunc) { failFunc(); }
        }).always(function () {
            joining = false;
        })
    }
}

//Check players every x seconds
function checkServer() {
    if (new Date() - lastTimeChecked > 500) {
        lastTimeChecked = new Date();
        checkPlayer();
        loadPayers();
    }

    if (!isOnline) {
        joinGame(null, function (scene) {
            console.log("Reconectando...");
        });
    }
}

//Check player connection
function checkPlayer() {
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