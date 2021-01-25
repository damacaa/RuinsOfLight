

$(document).ready(function () {

    pConnection = new WebSocket('ws://https://127.0.0.1:8080/player');

    pConnection.onerror = function (e) {
        console.log("WS error: " + e);
    }

    pConnection.onmessage = function (msg) {
        friend = JSON.parse(msg.data);
    }

    pConnection.onclose = function () {
        console.log("Closing socket");
    }
})

function SendPlayerInfo(plyr) {

    //console.log(plyr);

    let msg = {
        name: player.nick,
        x: plyr.x,
        y: plyr.y,
        anim: plyr.anims.currentAnim.key,
        prog: plyr.anims.getProgress(),//getTotalProgress
        flipX: plyr.flipX
    }

    //console.log("Mensaje enviado: " + message);
    pConnection.send(JSON.stringify(msg));
    //console.log(msg);
}

function SendDamage(idx, damage) {
    var msg = {
        idx: idx,
        damage: damage
    }
}
