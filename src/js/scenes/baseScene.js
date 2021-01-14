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

//Nivel en el que se encuntra la reliquia
let relicX;
let relicY;

let numberOfLevels = 2;

let startTime;

let godMode = false; //Vida infinita para los jugadores

let skip = false;

let inGame = false;

let currentScene;

function SkipRelic() {
    skip = true;
    hasRelic = true;
}

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

    godMode = false;
    skip = false;

    loadRecords();
}

class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);

        this.player0;
        this.player1;
        this.swordPlayer;
        this.bowPlayer;

        this.playerProjectiles;
        this.enemyProjectiles;
        this.players;
        this.enemies;
        this.health;

        this.entities = [];

        this.fading;

        
        
    }

    preload() {
        
    }

    create() {
        currentScene = this;

        inGame = true;


        //Crea listas
        this.playerProjectiles = this.physics.add.group();
        this.enemyProjectiles = this.physics.add.group();
        this.players = this.physics.add.group();
        this.enemies = this.physics.add.group();

        //Crea jugadores
        this.player0 = new Player(this, 128, 192, 'p0noWeapon', 'p0sword', 'p0bow', p0Health);
        this.player1 = new Player(this, 192, 192, 'p1noWeapon', 'p1sword', 'p1bow', p1Health);

        this.players.add(this.player0);
        this.players.add(this.player1);

        //Pone a cada jugador el arma correspondiente
        this.player0.SetWeapon(p0Weapon);
        this.player1.SetWeapon(p1Weapon);


        //Configura las cámaras
        this.camera = this.cameras.main;
        this.EnableFullScreen();
        this.camera.setOrigin(0.5, 0.5);
        this.camera.setBackgroundColor('rgba(21, 7, 4, 1)');

        this.camera1 = this.cameras.add(250, 10, 220, 115);
        this.camera1.setOrigin(0.5, 0.5).setBackgroundColor('rgba(21, 7, 4, 1)');

        if (this.swordPlayer) {
            this.camera1.startFollow(this.swordPlayer);
        }

        this.camera.visible = true;
        this.camera1.visible = false;

        //Activa el shader que difumina las luces
        this.camera.setRenderToTexture(customPipeline);
        this.camera1.setRenderToTexture(customPipeline);

        //Crea el escenario
        this.CreateStage();

        this.physics.add.overlap(this.players, this.enemyProjectiles, this.ProjectileDamage, null, this);
        this.physics.add.overlap(this.enemies, this.playerProjectiles, this.ProjectileDamage, null, this);

        this.fading = false;

        this.camera.fadeIn(500);
        this.camera1.fadeIn(500);
        this.camera.once('camerafadeincomplete', () => {
            this.fading = false;
        });

        ui.healthBar.Update();
    }

    LoadTileMap(key) {
        this.platforms = this.physics.add.staticGroup();

        this.map = this.make.tilemap({ key: key });
        this.wallTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.wallLayer = this.map.createStaticLayer('Pared', this.wallTiles, 0, 0).setDepth(-1);

        this.groundTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.groundLayer = this.map.createStaticLayer('Suelo', this.groundTiles, 0, 0).setDepth(4);

        //Colisiones
        this.groundLayer.setCollisionBetween(1, 34);

        this.physics.add.collider(this.players, this.groundLayer);
        this.physics.add.collider(this.enemies, this.groundLayer);

        this.camera.setBounds(0, 0, this.map.width * 32, this.map.height * 32);
        this.camera1.setBounds(0, 0, this.map.width * 32, this.map.height * 32);

        this.physics.add.collider(this.playerProjectiles, this.groundLayer);
        this.physics.add.overlap(this.enemyProjectiles, this.groundLayer, this.ProjectileHitsWall, null, this);
    }

    CheckInputs(delta) {
        //Controles jugador 0
        let cursors0 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        var keyObj = this.input.keyboard.addKey('E'); // Get key object

        if (cursors0.left.isDown) {
            this.player0.Run(-1, delta);
        } else if (cursors0.right.isDown) {
            this.player0.Run(1, delta);
        } else {
            this.player0.Run(0, delta);
        }

        if (cursors0.up.isDown) {
            this.player0.Jump();
        }

        if (keyObj.isDown) {
            this.player0.Attack();
        }

        if (keyObj.isUp) {
            this.player0.EnableAttack();
        }

        //Controles jugador 1
        let cursors1 = this.input.keyboard.createCursorKeys();

        if (cursors1.left.isDown) {
            this.player1.Run(-1, delta);
        } else if (cursors1.right.isDown) {
            this.player1.Run(1, delta);
        } else {
            this.player1.Run(0, delta);
        }

        if (cursors1.up.isDown) {
            this.player1.Jump();
        }

        this.input.mouse.disableContextMenu();

        this.input.on('pointerdown', function (pointer) {
            this.player1.Attack(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
        }, this);

        this.input.on('pointerup', function (pointer) {
            this.player1.EnableAttack();
        }, this);
    }

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

    CreateStage() { }

    UpdateStage(time, delta) { }

    MeleeDamage(weapon, target) {
        target.Hurt(10);
    }

    ProjectileDamage(target, projectile) {
        target.Hurt(100);
        projectile.destroy();
    }

    ProjectileHitsWall(projectile, wall) {
        if (wall.index != -1) {
            projectile.destroy();
        }
    }

    update(time, delta) {
        //console.log(1000/delta);//Muestra fps

        this.entities.forEach(element => element.Update(time, delta));
        this.CheckInputs(delta);

        this.UpdateStage(time, delta);

        if (!this.fading && this.swordPlayer && !this.camera.worldView.contains(this.swordPlayer.x, this.swordPlayer.y)) {
            this.camera1.visible = true;
        } else { this.camera1.visible = false; }

        checkServer();
    }

    LoadScene(key) {
        if (!this.fading) {
            this.fading = true;
            this.camera.fadeOut(500);
            this.camera1.fadeOut(500);
            p0Health = this.player0.health;
            p1Health = this.player1.health;
            this.entities = [];

            this.camera.once('camerafadeoutcomplete', () => {
                this.scene.start(key);  
            });
        }
    }
}
