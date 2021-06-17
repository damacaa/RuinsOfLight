const ID_LEAVE = -1;
const ID_JOIN = 0;
const ID_UPDATE_PLAYER = 1;
const ID_CHANGE_SCENE = 6;
const ID_MESSAGE = 7;
const ID_NEW_ENEMY = 4;
const ID_DAMAGE = 2;
const ID_NEW_RELIC = 3;
const ID_GET_RELIC = 5;


function ConnectWebSocket() {
	pConnection = new WebSocket(wsOrigin + '/player');//https://stackoverflow.com/questions/59359280/react-app-error-failed-to-construct-websocket-an-insecure-websocket-connecti

	pConnection.onerror = function () {
		console.log("WS error: " + e);
		currentScene.LoadScene('errorJ');
	}

	pConnection.onmessage = function (msg) {
		if (gameMode == 2) {
			let data = JSON.parse(msg.data);
			switch (JSON.parse(msg.data).id) {
				case ID_JOIN:
					joinedRoom = true;
					isOrange = data.isOrange;
					console.log("Sala: " + data.room);
					break;
				case ID_UPDATE_PLAYER:
					if (inGame && data.scene == currentIdx) {
						currentScene.player1.FakeUpdate(data.x, data.y, data.health, data.anim, data.prog, data.flipX, data.date);
						currentScene.player1.visible = true;
					} else if (inGame) { currentScene.player1.visible = false; }
					break;
				case ID_DAMAGE:
					currentScene.DamageEntity(data.eId, data.damage);
					break;
				case ID_NEW_RELIC:
					relicX = data.x;
					relicY = data.y;
					break;
				case ID_NEW_ENEMY:
					if (data.scene == currentIdx) { SpawnReceivedEnemy(data); }
					break;
				case ID_GET_RELIC:
					if (currentScene.relic) {
						currentScene.relic.GetRelic(false);
					} else { hasRelic = true; }
					break;
				case ID_LEAVE:
					if (inGame) { currentScene.LoadScene('gameOver'); }
					break;
				case ID_MESSAGE:
					if (data.scene == currentIdx) { currentScene.DrawMessage(data.value, data.x, data.y); }
					break;
				default:
					break;
			}
		}
	}

	pConnection.onopen = function () {
		isOnline = true;
	}

	pConnection.onclose = function () {
		console.log("Closing socket");
		if (gameMode == 2) {
			currentScene.LoadScene('errorJ');
		}
	}
}

let lDate = 0;
function SendPlayerInfo(plyr) {
	if (gameMode == 2 && pConnection.readyState == 1) {
		let currentDate = new Date();
		let msg = {
			id: 1,
			name: player.nick,
			x: plyr.x,
			y: plyr.y,
			health: plyr.health,
			anim: plyr.anims.currentAnim.key,
			prog: plyr.anims.getProgress(),//getTotalProgress 
			flipX: plyr.flipX,
			scene: plyr.scene.sceneIdx + levelX.toString() + levelY.toString(),
			date: (currentDate.getHours() * 10000000) + (currentDate.getMinutes() * 100000) + (currentDate.getSeconds() * 1000) + currentDate.getMilliseconds()
		}

		pConnection.send(JSON.stringify(msg));
	}
}

function SendDamage(eId, damage, scene) {
	if (gameMode == 2 && pConnection.readyState == 1) {
		if (eId > 1) {
			let msg = {
				id: 2,
				eId: eId,
				damage: damage,
				scene: currentIdx
			}
			pConnection.send(JSON.stringify(msg));
		}
	}
}

function SendRelicPos(rX, rY) {
	if (gameMode == 2 && pConnection.readyState == 1) {
		let msg = {
			id: 3,
			x: rX,
			y: rY
		}
		pConnection.send(JSON.stringify(msg));
	}
}

function SendNewEntity(scene, type, entityId, x, y) {
	if (gameMode == 2 && pConnection.readyState == 1) {
		//Type: //1 arrow //
		let msg = {
			id: 4,
			type: type,
			eId: entityId,
			x: x,
			y: y,
			scene: currentIdx
		}

		pConnection.send(JSON.stringify(msg));
	}
}

function SpawnReceivedEnemy(data) {
	if (gameMode == 2 && pConnection.readyState == 1) {
		let newEnemy;
		switch (data.type) {
			case 1:
				//arrow
				currentScene.player1.Attack(data.x, data.y);
				break;
			case 2:
				//guardian
				newEnemy = new Guardian(currentScene, data.x, data.y);
				newEnemy.id = data.eId;
				newEnemy.WakeUp();

				break;
			case 3:
				//ball
				newEnemy = new Ball(currentScene, data.x, data.y);
				newEnemy.id = data.eId;
				newEnemy.WakeUp();
				break;
			case 4:
				//drone
				newEnemy = new Drone(currentScene, data.x, data.y);
				newEnemy.id = data.eId;
				newEnemy.WakeUp();
				break;
			default:
				break;
		}
	}
}

function JoinRoom() {
	if (gameMode == 2 && pConnection.readyState == 1) {
		let msg = {
			id: 0,
			name: player.nick
		}
		pConnection.send(JSON.stringify(msg));
	}
}

function LeaveRoom() {
	if (gameMode == 2 && pConnection.readyState == 1) {
		let msg = {
			id: -1,
			name: player.nick
		}
		pConnection.send(JSON.stringify(msg));
	}
}

function WsGetRelic() {
	if (gameMode == 2 && pConnection.readyState == 1) {
		let msg = {
			id: 5
		}
		pConnection.send(JSON.stringify(msg));
	}
}

function wsCreateChat(value, scene, x, y) {
	if (gameMode == 2 && pConnection.readyState == 1) {
		currentScene.DrawMessage(value, x, y);

		let chat = { id: ID_MESSAGE, scene: scene, value: value, x: x, y: y }
		pConnection.send(JSON.stringify(chat));
	};
}