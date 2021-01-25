let p0Health;
let p1Health;

let p0Weapon;
let p1Weapon;

let levelX;
let levelY;
let whereAreTheyComingFrom;

let hasRelic;
let firstTimeBoss;
var defeatedBosses;

//Nivel en el que se encuntra la reliquia
let relicX;
let relicY;

let numberOfLevels = 2;

let startTime;

let godMode = false; //Vida infinita para los jugadores

let skip = false;

let inGame = false;

let sceneCount = 0;
let currentScene;

let gamepad;

let isOrange = true;

//API REST
let lastTimeChecked = new Date();

let records = [];
let players = [];
let chats = [];
let player = { nick: null };

let isOnline = false;
let joined = false;
let joining = false;

let origin = window.location.origin; //url in browser

//WEBSOCKET
let pConnection;
let friend = {
    name: "test",
    x: 240,
    y: 135
};