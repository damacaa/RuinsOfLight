//https://www.youtube.com/watch?v=1P8jvnj85e4

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

function ResetGame() {
    p0Health = 6;
    p1Health = 6;

    p0Weapon = 0;
    p1Weapon = 0;

    levelX = 1;
    levelY = 1;
    whereAreTheyComingFrom = 0;

    hasRelic = false;
    firstTimeBoss = true;
    defeatedBosses = 0;
}



class AltarRoom extends BaseScene {
    constructor() {
        super('altarRoom');
        this.swordAltar;
        this.bowAltar;

        this.center;
        this.loading = false;
    }

    CreateStage() {
        //this.camera.startFollow(this.player0, true);
        this.player0.x = 80;
        this.player1.x = 100;

        this.bg = this.add.sprite(0, -32, 'bossBackground').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);
        //Crea escenario
        this.LoadTileMap('altarRoom');

        this.center = this.add.image(256, 64);
        this.center.visible = false;

        this.bowAltar = new Altar(this, 200, 191, 'bowAltar', 'bow');

        this.swordAltar = new Altar(this, 288, 191, 'swordAltar', 'sword');

        this.bowAltar.otherAltar = this.swordAltar;
        this.swordAltar.otherAltar = this.bowAltar;

        //Muestra los controles
        this.controls0 = this.add.sprite(this.player0.x - 30, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);
        this.controls0 = this.add.sprite(this.player1.x + 30, this.player1.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(1).setDepth(10);

        //Crea puertas
        this.door = new SceneDoor(this, 384, 160, 'bossRoom');
        this.door.Close();

        this.sound.stopAll();
        this.musicBGAltar = this.sound.play("music", { loop: true }, { volume: 2 });
    }

    UpdateStage(time, delta) {
        if (!this.loading && this.bowAltar.activated && this.swordAltar.activated && this.bowAltar.player != this.swordAltar.player) {

            this.loading = true;

            this.time.delayedCall(1000, function () {
                if (this.bowAltar.activated && this.swordAltar.activated && this.bowAltar.player != this.swordAltar.player) {
                    this.cameras.main.flash(1000);

                    this.swordAltar.done = true;
                    this.bowAltar.done = true;

                    this.swordAltar.player.SetWeapon(1);
                    this.bowAltar.player.SetWeapon(2);

                    this.swordAltar.Deactivate();
                    this.bowAltar.Deactivate();

                    this.swordAltar.weapon.destroy();
                    this.bowAltar.weapon.destroy();

                    if (this.swordPlayer == this.player0) {
                        p0Weapon = 1;
                        p1Weapon = 2;
                    } else {
                        p0Weapon = 2;
                        p1Weapon = 1;
                    }

                    this.loading = false;

                    this.door.Open();
                } else { this.loading = false; }
            }, [], this);
        }
    }
}

class BossRoom extends BaseScene {
    constructor() {
        super('bossRoom');
    }

    CreateStage() {
        this.camera.startFollow(this.bowPlayer, true);
        this.bg = this.add.sprite(0, -32, 'bossBackground').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);
        //this.bg = this.add.sprite(240 + 480, 135, 'intro').setOrigin(0.5, 0.5).setScrollFactor(.25).setDepth(-1).flipX = true;

        //Crea escenario
        this.LoadTileMap('bossRoom');

        //Crea puertas
        this.dungeonDoor = new SceneDoor(this, 1184, 160, 'dungeon', false);
        this.exitDoor = new SceneDoor(this, 32, 160, 'credits', true);
        this.exitDoor.Close();

        //Crea enemigos
        this.gorila = new GreatGorila(this, 500, 96, 'greatGorila');
        this.parrot = new Parrot(this, 650, 175, 'greatParrot');

        if (!firstTimeBoss) {
            this.player0.x = this.dungeonDoor.x - 80;
            this.player1.x = this.dungeonDoor.x - 48;
            this.player0.y = this.dungeonDoor.y;
            this.player1.y = this.dungeonDoor.y;

            this.player0.flipX = true;
            this.player1.flipX = true;
        } else {
            this.controls1 = this.add.sprite(this.player0.x, this.player0.y - 32, 'Attackcontrols').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);
            this.controls1 = this.add.sprite(this.player1.x, this.player1.y - 32, 'Attackcontrols').setOrigin(0.5, 0.5).setFrame(1).setDepth(10);

            firstTimeBoss = false;
        }

        if (hasRelic) {
            this.dungeonDoor.Close();

            this.sound.stopAll();
            this.musicBGBoss = this.sound.play("fastMusic", { loop: true }, { volume: 2 });

            //Dependiendo del número de bosses derrotados se activa el siguiente boss
            switch (defeatedBosses) {
                case 0:
                    if (hasRelic) {
                        this.dungeonDoor.Close();
                        this.currentBoss = this.gorila;
                        this.gorila.WakeUp();
                        hasRelic = false;
                        this.sound.play("effectBaseGorila", { loop: true });
                    }
                    break;
                case 1:
                    if (hasRelic) {
                        this.dungeonDoor.Close();
                        this.currentBoss = this.parrot;
                        this.parrot.WakeUp();
                        hasRelic = false;
                        this.sound.play("effectBaseParrot", { loop: true });
                    }
                    this.gorila.setFrame(27);
                    break;

                default:
                    break;
            }

            hasRelic = false;
        } 
        else {
            this.sound.stopAll();
            this.musicBGBoss = this.sound.play("music", { loop: true }, { volume: 2 });
        }
    }

    UpdateStage() {
        if (this.currentBoss && !this.currentBoss.awake) {
            if (defeatedBosses == 2) {
                this.exitDoor.Open();
            } else { this.dungeonDoor.Open(); }
        }
    }
}


class Dungeons extends BaseScene {
    //https://www.youtube.com/watch?v=2_x1dOvgF1E
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/multiple-tile-sizes
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/tile-callbacks

    constructor() {
        super('dungeon');
        this.canSpawnEnemies = false;
        this.nextSpawnTime = 20000;
        this.spawnWait = 5000;
    }

    preload() {
        this.load.image('atlas', 'resources/levels/Tile_sheet.png');
        this.load.tilemapTiledJSON('map1_1', 'resources/levels/SueloNivel1.json');
        this.load.tilemapTiledJSON('map2_1', 'resources/levels/SueloNivel2.json');
        this.load.tilemapTiledJSON('map2_2', 'resources/levels/SueloNivel3.json');
    }

    CreateStage() {
        ////https://www.html5gamedevs.com/topic/41691-cant-get-group-to-work/
        this.camera.startFollow(this.bowPlayer, true);

        this.levelId = levelX + "_" + levelY;

        this.LoadTileMap('map' + this.levelId);



        for (let index = 0; index < this.map.width * 32; index += 159) {
            this.bg = this.add.sprite(index, 0, 'background').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);
        }

        //Añade a cada nivel los items
        switch (levelX) {
            case 1:
                //1.1
                this.stairs = new SceneDoor(this, 32, 5 * 32, 'bossRoom', true);


                /*if(hasRelic){
                    this.stairs.body.enable = true;
                }else{
                    this.stairs.body.enable = false;
                }*/

                new Relic(this, 400, 6 * 32);

                this.door1 = new DungeonDoor(this, 7 * 32, 15 * 32, "2_1");
                this.door2 = new DungeonDoor(this, 65 * 32, 9 * 32, "2_2");
                break;

            case 2:
                switch (levelY) {
                    case 1:
                        //2.1
                        this.stairs = new DungeonStairs(this, 32, 5 * 32, "1_1");
                        new Relic(this, 3 * 32 - 3, 13 * 32);
                        break;

                    case 2:
                        //2.2
                        this.stairs = new DungeonStairs(this, 32, 7 * 32, "1_1");
                        new Relic(this, 51 * 32, 23 * 32);
                        break;

                    default:
                        break;
                }
                break;

            default:
                console.log(levelX + "_" + levelY);
                //new SceneDoor(this, 10 * 32, 6 * 32, 'mainMenu');
                break;
        }

        //Dependiendo de de qué nivel vengan, los jugadores aparecen en un sitio u otro
        switch (whereAreTheyComingFrom) {
            case 0:
                //Aparecer en escaleras
                this.player0.x = this.stairs.x + 64;
                this.player1.x = this.stairs.x + 128;
                break;

            case 1:
                //Aparecer en puerta 1
                this.player0.x = this.door1.x - 48;
                this.player1.x = this.door1.x + 48;

                this.player0.y = this.door1.y;
                this.player1.y = this.door1.y;
                break;

            case 2:
                //Aparecer en puerta 2
                this.player0.x = this.door2.x - 48;
                this.player1.x = this.door2.x + 48;

                this.player0.y = this.door2.y;
                this.player1.y = this.door2.y;
                break;

            default:
                break;
        }
        this.sound.stopAll();
        this.musicBGDungeon = this.sound.play("music", { loop: true }, { volume: 2 });
    }

    UpdateStage(time, delta) {
        this.entities.forEach(element => element.Update());
        this.CheckInputs(delta);

        if (this.canSpawnEnemies) {

            let x = this.bowPlayer.x + 300;
            if (x < this.map.width * 32) {
                this.randomEnemy = new Guardian(this, x, this.bowPlayer.y - 32, 'guardian');
                this.randomEnemy.primaryTarget = this.bowPlayer;
                this.randomEnemy.WakeUp();
                this.randomEnemy = new Drone(this, x, this.bowPlayer.y - 32, 'drone');
                this.randomEnemy.primaryTarget = this.bowPlayer;
                this.randomEnemy.WakeUp();
            }

            x = this.bowPlayer.x - 300;
            if (x > 32) {
                this.randomEnemy = new Drone(this, x, this.bowPlayer.y - 32, 'drone');
                this.randomEnemy.primaryTarget = this.bowPlayer;
                this.randomEnemy.WakeUp();

                this.randomEnemy = new Ball(this, x, this.bowPlayer.y - 32, 'ball');
                this.randomEnemy.primaryTarget = this.bowPlayer;
                this.randomEnemy.WakeUp();
            }

            this.nextSpawnTime = time + this.spawnWait;
            this.canSpawnEnemies = false;

            if (this.spawnWait > 2000) { this.spawnWait *= .99; }

        } else if (this.nextSpawnTime <= time && this.entities.length < 10) {
            this.canSpawnEnemies = true;
        }
    }
}

class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenu');

        this.step = 0;
        this.steps = 7;
    }

    preload() {
        this.load.spritesheet('intro',
            '/resources/img/intro.png', {
            frameWidth: 480,
            frameHeight: 270
        }
        );

        this.load.image('title', '/resources/img/Interfaz/Menu/Title.png');
        this.load.image('newGame', '/resources/img/Interfaz/Menu/Buttons1.png');
        this.load.image('credits', '/resources/img/Interfaz/Menu/Buttons2.png');

        this.load.image('menuBackground', '/resources/img/Interfaz/Menu/menuBackground.png');

        this.load.audio("music", "resources/audio/music.ogg");
    }

    create() {
        ResetGame();

        this.camera = this.cameras.main;
        this.EnableFullScreen();



        this.title = this.add.image(170, 40, 'title').setOrigin(0.5, 0.5).setDepth(10);
        this.bg = this.add.sprite(240, 135, 'intro').setOrigin(0.5, 0.5);

        this.newGame = this.add.image(65, 90, 'newGame').setOrigin(0.5, 0.5).setDepth(10).setInteractive();
            this.credits = this.add.image(65, 130, 'credits').setOrigin(0.5, 0.5).setDepth(10).setInteractive();

        


            this.newGame.on('pointerdown', function (event) {
                if (this.step == 0) {
                    this.step++;
                    this.bg.setFrame(this.step);
                    this.title.destroy();
                    this.newGame.destroy();
                    this.credits.destroy();


                    this.text = this.add.text(240, 260, 'CLICK TO CONTINUE', {
                        fontFamily: '"CambriaB"',
                        fontSize: '10px'
                    }).setOrigin(0.5).setDepth(10);; //, stroke: '0f0f0f', strokeThickness: 20
                    this.input.on('pointerdown', function (event) {
                        if (this.step == 0) {
                            this.step++;
                            this.bg.setFrame(this.step);
                        } else if (this.step < this.steps) {
                            this.step++;
                            this.bg.setFrame(this.step);
                        } else {
                            this.step = 0;
                            this.scene.start('altarRoom');
                        }

                    }, this);
                    this.sound.stopAll();
        this.musicBGMainMenu = this.sound.play("music", { loop: true }, { volume: 2 });


                }

            }, this);


            this.credits.on('pointerdown', function (event) {

                this.scene.start('credits');

            }, this);

        
    }

    update(time, delta) { }

    EnableFullScreen() {

        var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);
    }

}

class Credits extends Phaser.Scene {

    constructor() {
        super('credits');

    }

    preload() {
        this.load.spritesheet('endCredits',
            '/resources/img/Interfaz/EndCredits/Credits.png', {
            frameWidth: 480,
            frameHeight: 270
        }
        );

    }

    create() {

        this.anims.create({
            key: 'credits',
            frames: this.anims.generateFrameNumbers('endCredits', { start: 0, end: 70 }),
            frameRate: 7,
            repeat: 0
        });


        this.camera = this.cameras.main;

        this.cr = this.add.sprite(240, 135, 'endCredits').setOrigin(0.5, 0.5);

        this.cr.anims.play('credits', true);

        this.cr.once('animationcomplete', () => {
            this.scene.start('mainMenu');
        });

    }

    update(time, delta) { }

}

class GameOver extends Phaser.Scene {

    constructor() {
        super('gameOver');

    }

    preload() {

        this.load.image('gameOver', '/resources/img/Interfaz/Game Over/Game Over.png');
    }

    create() {

        this.camera = this.cameras.main;

        this.gO = this.add.image(240, 135, 'gameOver').setOrigin(0.5, 0.5);

        this.time.delayedCall(2000, function () {
            this.text = this.add.text(240, 250, 'CLICK TO PLAY AGAIN', {
                fontFamily: '"CambriaB"',
                fontSize: '12px'
            }).setOrigin(0.5).setDepth(10);


            this.input.on('pointerdown', function (event) {

                this.scene.start('mainMenu');


            }, this);
        }, [], this);
    }

    update(time, delta) { }

}



