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
        //Personajes
        this.load.spritesheet('p0noWeapon',
            'resources/animations/players/p0noWeapon.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p0sword',
            'resources/animations/players/p0Sword.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p0bow',
            'resources/animations/players/p0Bow.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p1noWeapon',
            'resources/animations/players/p1noWeapon.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p1sword',
            'resources/animations/players/p1Sword.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p1bow',
            'resources/animations/players/p1Bow.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('arrow',
            'resources/animations/players/Flecha.png', {
            frameWidth: 21,
            frameHeight: 3
        }
        );

        //Enemigos
        this.load.spritesheet('greatGorila',
            'resources/animations/enemies/Gorila/Gorila.png', {
            frameWidth: 256,
            frameHeight: 256
        }
        );

        this.load.spritesheet('greatParrot',
            'resources/animations/enemies/Parrot/Parrot.png', {
            frameWidth: 256,
            frameHeight: 256
        }
        );

        this.load.spritesheet('gorilaProjectileKey',
            'resources/animations/enemies/Gorila/GorilaProjectile.png', {
            frameWidth: 64,
            frameHeight: 32
        }
        );

        this.load.spritesheet('ball',
            'resources/animations/enemies/Ball/Ball.png', {
            frameWidth: 63,
            frameHeight: 63
        }
        );


        this.load.spritesheet('drone',
            'resources/animations/enemies/Drone/Drone.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );

        this.load.spritesheet('droneShotKey',
            'resources/animations/enemies/Drone/DroneShot.png', {
            frameWidth: 6,
            frameHeight: 6
        }
        );

        this.load.spritesheet('guardian',
            'resources/animations/enemies/Guardian/guardian.png', {
            frameWidth: 129,
            frameHeight: 90

        }
        );

        this.load.spritesheet('swordAltar',
            'resources/img/Items/Altares/AltarEspada.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );


        this.load.spritesheet('bowAltar',
            'resources/img/Items/Altares/AltarArco.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );

        this.load.spritesheet('puertaEntrada',
            'resources/img/Items/Arcos de Paso/Entrada.png', {
            frameWidth: 64,
            frameHeight: 64
        }
        );

        //Escenario
        this.load.image('puerta', 'resources/img/Items/Arcos de Paso/Arco de Paso.png');
        this.load.image('escalerasL', 'resources/img/Items/Escaleras/escaleras_laterales.png');
        this.load.image('bossBackground', 'resources/img/bossBackground.png');
        this.load.image('background', 'resources/img/background.png');
        this.load.image('relic', 'resources/img/Items/Reliquia/Reliquia.png')
        this.load.image('healthPotion', 'resources/img/Items/Potions/HealthPotion.png')
        this.load.image('sword', 'resources/img/Items/Weapons/Sword.png')
        this.load.image('bow', 'resources/img/Items/Weapons/Bow.png')
        this.load.image('bossAltar', 'resources/img/Items/Altares/AltarBoss.png')

        this.load.image('atlas', 'resources/levels/Tile_sheet.png');
        this.load.tilemapTiledJSON('altarRoom', 'resources/levels/AltarRoom.json');
        this.load.tilemapTiledJSON('bossRoom', 'resources/levels/BossRoom.json');

        //Musica
        this.load.audio("music", "resources/audio/music.ogg"); // Musica fondo
        this.load.audio("battleMusic", "resources/audio/musicBattle.ogg"); // Musica fondo batalla
        this.load.audio("gameOverMusic", "resources/audio/musicGameOver.ogg"); // Musica derrota
        this.load.audio("winMusic", "resources/audio/musicWin.ogg"); // Musica victoria

        //Efectos jugadores
        this.load.audio("effectSword", "resources/audio/effects/players/sword.ogg"); // Efecto espada
        this.load.audio("effectSword2", "resources/audio/effects/players/sword2.ogg"); // Efecto espada
        this.load.audio("effectSword3", "resources/audio/effects/players/sword3.ogg"); // Efecto espada
        this.load.audio("effectSwordFall", "resources/audio/effects/players/swordFall.ogg"); // Efecto espada caida
        this.load.audio("effectBow", "resources/audio/effects/players/bow2.ogg"); // Efecto arco
        this.load.audio("effectHurt", "resources/audio/effects/players/hurt.ogg"); // Efecto daño
        this.load.audio("effectJump", "resources/audio/effects/players/jump.ogg"); // Efecto daño

        //Efectos enemigos
        this.load.audio("effectGorila", "resources/audio/effects/enemies/gorila.ogg"); // Efecto gorila ataque
        this.load.audio("effectBaseGorila", "resources/audio/effects/enemies/baseGorila.ogg"); // Efecto gorila
        this.load.audio("effectDeathGorila", "resources/audio/effects/enemies/gorilaDeath.ogg"); // Efecto gorila muerte
        this.load.audio("effectParrot", "resources/audio/effects/enemies/parrot.ogg"); // Efecto loro ataque
        this.load.audio("effectBaseParrot", "resources/audio/effects/enemies/baseParrot.ogg"); // Efecto loro
        this.load.audio("effectDeathParrot", "resources/audio/effects/enemies/parrotDeath.ogg"); // Efecto loro muerte
        this.load.audio("effectGuardian", "resources/audio/effects/enemies/guardian.ogg"); // Efecto guardian ataque
        this.load.audio("effectDrone", "resources/audio/effects/enemies/drone2.ogg"); // Efecto dron ataque
        this.load.audio("effectBall", "resources/audio/effects/enemies/ball.ogg"); // Efecto bola ataque

        //Reliquias
        this.load.audio("effectGorilaRelic", "resources/audio/effects/enemies/gorilaRelic.ogg"); // Efecto reliquia gorila
        this.load.audio("effectParrotRelic", "resources/audio/effects/enemies/parrotRelic.ogg"); // Efecto reliquia loro


        //Efectos intro
        this.load.audio("effectIntroDoor", "resources/audio/effects/doorClosed.ogg"); // Efecto puerta   ////////////////////////////////////
        this.load.audio("effectPotion", "resources/audio/effects/potion.ogg"); // Efecto pocion


        //Interfaz
        this.load.spritesheet('vidas',
            'resources/img/Interfaz/Vida2.png', {
            frameWidth: 154,
            frameHeight: 8
        }
        );

        this.load.spritesheet('controls',
            'resources/img/Interfaz/Controls.png', {
            frameWidth: 55,
            frameHeight: 47
        }
        );

        this.load.spritesheet('Attackcontrols',
            'resources/img/Interfaz/AttackControls.png', {
            frameWidth: 17,
            frameHeight: 18
        }
        );
    }

    create() {
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

        this.camera1.visible = false;

        //Activa el shader que difumina las luces
        this.camera.setRenderToTexture(customPipeline);
        this.camera1.setRenderToTexture(customPipeline);

        //Crea el escenario
        this.CreateStage();

        this.physics.add.overlap(this.players, this.enemyProjectiles, this.ProjectileDamage, null, this);
        this.physics.add.overlap(this.enemies, this.playerProjectiles, this.ProjectileDamage, null, this);

        this.health = new PlayerHealthBar(this, 40, 10, this.player0, this.player1, 'vidas').setScrollFactor(0).setDepth(10).setOrigin(0, 0);
        this.health.UpdateLifes();

        this.camera1.ignore(this.health);

        this.fading = true;

        this.camera.fadeIn(500);
        this.cameras.main.once('camerafadeincomplete', () => {
            this.fading = false;
        });
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

        if (!isOnline) {
            //Falta mejorar
            this.LoadScene('nameInput');
            canJoin = false;
            console.log("caca de vaca")
        }
    }

    LoadScene(key) {
        if (!this.fading) {
            this.fading = true;
            this.cameras.main.fadeOut(500);
            p0Health = this.player0.health;
            p1Health = this.player1.health;
            this.entities = [];

            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.scene.start(key);
            });
        }
    }
}
