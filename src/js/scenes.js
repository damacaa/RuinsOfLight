//https://www.youtube.com/watch?v=1P8jvnj85e4
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

        this.entities = [];
    }

    preload() {
        //Personajes
        this.load.spritesheet('p0noWeapon',
            '/resources/animations/players/p0noWeapon.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p0sword',
            '/resources/animations/players/p0Sword.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p0bow',
            '/resources/animations/players/p0Bow.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p1noWeapon',
            '/resources/animations/players/p1noWeapon.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p1sword',
            '/resources/animations/players/p1Sword.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p1bow',
            '/resources/animations/players/p1Bow.png', {
            frameWidth: 80,
            frameHeight: 64
        }
        );

        //Enemigos
        this.load.spritesheet('greatGorila',
            '/resources/animations/enemies/Gorila/Gorila.png', {
            frameWidth: 256,
            frameHeight: 256
        }
        );

        this.load.spritesheet('greatParrot',
            '/resources/animations/enemies/Parrot/Parrot.png', {
            frameWidth: 256,
            frameHeight: 256
        }
        );

        this.load.spritesheet('gorilaProjectileKey',
            '/resources/animations/enemies/Gorila/GorilaProjectile.png', {
            frameWidth: 64,
            frameHeight: 32
        }
        );

        this.load.spritesheet('ball',
            '/resources/animations/enemies/Ball/Ball.png', {
            frameWidth: 63,
            frameHeight: 63
        }
        );

        //Escenario
        this.load.image('puerta', '/resources/img/Items/Arcos de Paso/Arcos de Paso.png');
        this.load.image('escalerasL', '/resources/img/Items/Escaleras/escaleras_laterales.png');
        this.load.image('ground', '/resources/img/tiles/BrickWall.png');
        this.load.image('background', '/resources/img/background.png');
    }

    create() {
        //Crea listas de entidades
        this.playerProjectiles = this.physics.add.group();
        this.enemyProjectiles = this.physics.add.group();
        this.players = this.physics.add.group();
        this.enemies = this.physics.add.group();

        //Crea jugadores //Se deberían crear solo una vez en altares y mantener para todas las escenas --> Mover al CreateStage de altares
        this.player0 = new Player(this, 128, 32, 'p0noWeapon', 'p0sword', 'p0bow');
        this.player1 = new Player(this, 64, 32, 'p1noWeapon', 'p1sword', 'p1bow');

        this.players.add(this.player0);
        this.players.add(this.player1);

        this.player0.SetWeapon(1);
        this.player1.SetWeapon(2);


        //Configura la cámara
        this.camera = this.cameras.main;
        this.EnableFullScreen();
        //this.camera.setZoom(.5);
        this.camera.setOrigin(0.5, 0.5);
        this.camera.startFollow(this.bowPlayer, true);

        this.CreateStage();

        //Añade colisiones



        this.physics.add.overlap(this.players, this.enemyProjectiles, this.ProjectileDamage, null, this);
        this.physics.add.overlap(this.enemies, this.playerProjectiles, this.ProjectileDamage, null, this);
        //this.physics.add.overlap(this.enemies, this.enemyProjectiles, this.ProjectileDamage, null, this);

        this.physics.world.setFPS(60);

        this.graphics = this.add.graphics();
        this.graphics.lineStyle(1, 0x00ff00, 1);

        this.text = this.add.text(10, 10, 'ExampleUI', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px'
            , fill: '#ffffff'
        }).setScrollFactor(0);

    }

    CheckInputs(delta) {


        let cursors0 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });


        var keyObj = this.input.keyboard.addKey('E'); // Get key object
        var isDown = keyObj.isDown;
        var isUp = keyObj.isUp;


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

        if (isDown) {
            this.player0.Attack();
        }

        if (isUp) {
            this.player0.EnableAttack();
        }

        //////////////////////////////////////////////////////////////////////

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
                //button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                //button.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);
    }

    CreateStage() { }

    MeleeDamage(weapon, target) {
        target.Hurt(10);
    }

    ProjectileDamage(target, projectile) {
        target.Hurt(10);
        projectile.destroy();
    }

    update(time, delta) {
        this.entities.forEach(element => element.Update());
        this.CheckInputs(delta);
    }

    LoadScene(key) {
        this.scene.start(key);
    }
}

let hasRelic = false;
class BossRoom extends BaseScene {
    constructor() {
        super('bossRoom');
    }

    CreateStage() {
        //this.camera.setOrigin(0.5, 0.75);
        //this.bg = this.add.image(0, 0, 'background');

        //Crea escenario
        this.platforms = this.physics.add.staticGroup();

        for (let i = 0; i < 40; i++) {
            this.platforms.create(16 + (32 * i), 230, 'ground');
        }

        //Crea puertas
        this.door = new SceneDoor(this, 1200, 182, 'dungeon');


        //Crea enemigos
        this.gorila = new GreatGorila(this, 500, 86, 'greatGorila');
        this.parrot = new Parrot(this, 800, 0, 'greatParrot');

        this.physics.add.collider(this.players, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);

        if (hasRelic) {
            this.player0.x = this.door.x-80;
            this.player1.x = this.door.x-48;

            //this.player0.y = this.door1.y;
            //this.player1.y = this.door1.y;

            this.player0.flipX = true;
            this.player1.flipX = true;

            hasRelic = false;
        }
    }
}

let levelX = 1;
let levelY = 1;

let whereAreTheyComingFrom = 0;

class Dungeons extends BaseScene {
    //https://www.youtube.com/watch?v=2_x1dOvgF1E
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/multiple-tile-sizes
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/tile-callbacks

    constructor() {
        super('dungeon');
        this.canSpawnEnemies = false;
        this.nextSpawnTime = 10000;
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
        this.levelId = levelX + "_" + levelY;

        this.map = this.make.tilemap({ key: 'map' + this.levelId });
        this.groundTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.groundLayer = this.map.createStaticLayer('Suelo', this.groundTiles, 0, 0);

        //Colisiones
        this.groundLayer.setCollisionBetween(1, 29);
        //this.groundLayer.setCollision(2);

        this.physics.add.collider(this.players, this.groundLayer);
        this.physics.add.collider(this.enemies, this.groundLayer);

        this.camera.setBounds(0, 0, this.map.width * 32, this.map.height * 32);

        switch (levelX) {
            case 1:
                //1.1
                this.stairs = new SceneStairs(this, 64, 6 * 32, 'bossRoom');

                this.door1 = new DungeonDoor(this, 7 * 32, 15 * 32, "2_1");
                this.door2 = new DungeonDoor(this, 65 * 32, 9 * 32, "2_2");
                break;

            case 2:
                switch (levelY) {
                    case 1:
                        //2.1
                        this.stairs = new DungeonStairs(this, 64, 6 * 32, "1_1");
                        new SceneDoor(this, 3 * 32, 13 * 32, 'mainMenu');
                        break;

                    case 2:
                        //2.2
                        this.stairs = new DungeonStairs(this, 1 * 32, 8 * 32, "1_1");
                        new SceneDoor(this, 51 * 32, 23 * 32, 'mainMenu');
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


        switch (whereAreTheyComingFrom) {
            case 0:
                //Aparecer en escaleras
                this.player0.body.x = this.stairs.x + 64;
                this.player1.x = this.stairs.x + 96;
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
    }

    update(time, delta) {
        this.entities.forEach(element => element.Update());
        this.CheckInputs(delta);

        if (this.canSpawnEnemies) {

            let x = this.player0.x + 300;
            if (x < this.map.width * 32) {
                this.randomEnemy = new Ball(this, x, this.player0.y - 32, 'ball');
                this.randomEnemy.primaryTarget = this.player0;
                this.randomEnemy.WakeUp();
            }

            x = this.player0.x - 300;
            if (x > 32) {
                this.randomEnemy = new Ball(this, x, this.player0.y - 32, 'ball');
                this.randomEnemy.primaryTarget = this.player0;
                this.randomEnemy.WakeUp();
            }

            this.nextSpawnTime = time + this.spawnWait;
            this.canSpawnEnemies = false;

            this.spawnWait *= .99;
        } else if (this.nextSpawnTime <= time && this.entities.length < 100) {
            this.canSpawnEnemies = true;
        }
    }
}

class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenu');
    }

    preload() {
    }

    create() {
        this.camera = this.cameras.main;
        this.EnableFullScreen();

        this.add.text(240, 135, 'PRESS TO PLAY', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px'
        }).setOrigin(0.5); //, stroke: '0f0f0f', strokeThickness: 20


        this.input.once('pointerdown', function (event) {

            this.scene.start('bossRoom');

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

} 