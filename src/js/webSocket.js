

$(document).ready(function () {

    pConnection = new WebSocket('ws://127.0.0.1:8080/player');//https://stackoverflow.com/questions/59359280/react-app-error-failed-to-construct-websocket-an-insecure-websocket-connecti

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
        flipX: plyr.flipX,
        scene: plyr.scene.sceneIdx + levelX.toString() + levelY.toString()
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