

$(document).ready(function () {
    //let o = origin.split("/")[2];//ngrok
    let o = "localhost:8080";
    pConnection = new WebSocket('ws://' + o + '/player');//https://stackoverflow.com/questions/59359280/react-app-error-failed-to-construct-websocket-an-insecure-websocket-connecti

    pConnection.onerror = function (e) {
        console.log("WS error: " + e);
    }

    pConnection.onmessage = function (msg) {
        let data;
        switch (JSON.parse(msg.data).id) {
            case 1:
                friend = JSON.parse(msg.data);
                break;

            case 2:
                data = JSON.parse(msg.data);
                currentScene.DamageEntity(data.idx, data.damage);
                break;
            case 3:
                data = JSON.parse(msg.data);
                relicX = data.x;
                relicY = data.y;
                break;
            default:
                break;
        }
    }

    pConnection.onopen = function () {
        gameMode = 2;
    }

    pConnection.onclose = function () {
        console.log("Closing socket");
    }
})

function SendPlayerInfo(plyr) {
    let msg = {
        id: 1,
        name: player.nick,
        x: plyr.x,
        y: plyr.y,
        health: plyr.health,
        anim: plyr.anims.currentAnim.key,
        prog: plyr.anims.getProgress(),//getTotalProgress 
        flipX: plyr.flipX,
        scene: plyr.scene.sceneIdx + levelX.toString() + levelY.toString()
    }
    pConnection.send(JSON.stringify(msg));
}

function SendDamage(idx, damage, scene) {
    if (idx > 1) {
        let msg = {
            id: 2,
            idx: idx,
            damage: damage,
            scene: scene.sceneIdx + levelX.toString() + levelY.toString()
        }
        pConnection.send(JSON.stringify(msg));
    }
}

function SendRelicPos(rX, rY) {
    let msg = {
        id: 3,
        x: rX,
        y: rY
    }
    pConnection.send(JSON.stringify(msg));
}