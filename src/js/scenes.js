//https://www.youtube.com/watch?v=1P8jvnj85e4
let p0Health = 6;
let p1Health = 6;

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

        this.load.spritesheet('arrow',
            '/resources/animations/players/Flecha.png', {
            frameWidth: 21,
            frameHeight: 3
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


        this.load.spritesheet('drone',
            '/resources/animations/enemies/Drone/Drone.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );

        this.load.spritesheet('droneShotKey',
            '/resources/animations/enemies/Drone/DroneShot.png', {
            frameWidth: 16,
            frameHeight: 16
        }
        );

        this.load.spritesheet('guardian',
            '/resources/animations/enemies/Guardian/guardian.png', {
            frameWidth: 129,
            frameHeight: 90

        }
        );

        //Escenario
        this.load.image('puerta', '/resources/img/Items/Arcos de Paso/Arcos de Paso.png');
        this.load.image('escalerasL', '/resources/img/Items/Escaleras/escaleras_laterales.png');
        this.load.image('wall', '/resources/img/tiles/BrickWall.png');
        this.load.image('bossBackground', '/resources/img/bossBackground.png');
        this.load.image('background', '/resources/img/background.png');
        this.load.image('relic', '/resources/img/Items/Reliquia/Reliquia.png')

        this.load.image('atlas', 'resources/levels/Tile_sheet.png');
        this.load.tilemapTiledJSON('bossRoom', 'resources/levels/BossRoom.json');

        //Interfaz
        this.load.spritesheet('vidas',
            '/resources/img/Interfaz/Vida2.png', {
            frameWidth: 154,
            frameHeight: 8
        }
        );

        this.load.spritesheet('controls',
            '/resources/img/Interfaz/Controls.png', {
            frameWidth: 55,
            frameHeight: 47
        }
        );
    }

    create() {
        //Crea listas de entidades
        this.playerProjectiles = this.physics.add.group();
        this.enemyProjectiles = this.physics.add.group();
        this.players = this.physics.add.group();
        this.enemies = this.physics.add.group();

        //Crea jugadores //Se deberían crear solo una vez en altares y mantener para todas las escenas --> Mover al CreateStage de altares
        this.player0 = new Player(this, 128, 192, 'p0noWeapon', 'p0sword', 'p0bow', p0Health);
        this.player1 = new Player(this, 192, 192, 'p1noWeapon', 'p1sword', 'p0bow', p1Health);

        this.players.add(this.player0);
        this.players.add(this.player1);

        this.player0.SetWeapon(2);
        this.player1.SetWeapon(1);


        //Configura la cámara
        this.camera = this.cameras.main;
        this.EnableFullScreen();
        //this.camera.setZoom(.5);
        this.camera.setOrigin(0.5, 0.5);
        this.camera.startFollow(this.player0, true);
        this.camera.setBackgroundColor('rgba(21, 7, 4, 1)');

        this.CreateStage();

        //Añade colisiones

        /*this.physics.add.collider(this.players, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);*/

        this.physics.add.overlap(this.players, this.enemyProjectiles, this.ProjectileDamage, null, this);
        this.physics.add.overlap(this.enemies, this.playerProjectiles, this.ProjectileDamage, null, this);
        //this.physics.add.overlap(this.enemies, this.enemyProjectiles, this.ProjectileDamage, null, this);

        this.physics.world.setFPS(60);
        /*
        this.graphics = this.add.graphics();
        //this.graphics.lineStyle(1, 0x00ff00, 1);
        
        this.text = this.add.text(10, 10, 'ExampleUI', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px'
            , fill: '#ffffff'
        }).setScrollFactor(0);
        */
        this.health = new Health(this, 120, 20, this.player0, this.player1, 'vidas').setScrollFactor(0).setDepth(10).setOrigin(0.5, 0.5);
        this.health.UpdateLifes();

    }

    LoadTileMap(key) {
        this.platforms = this.physics.add.staticGroup();

        this.map = this.make.tilemap({ key: key });
        this.wallTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.wallLayer = this.map.createStaticLayer('Pared', this.wallTiles, 0, 0).setDepth(-1);

        this.groundTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.groundLayer = this.map.createStaticLayer('Suelo', this.groundTiles, 0, 0);



        //Colisiones
        this.groundLayer.setCollisionBetween(1, 29);

        this.physics.add.collider(this.players, this.groundLayer);
        this.physics.add.collider(this.enemies, this.groundLayer);

        this.camera.setBounds(0, 0, this.map.width * 32, this.map.height * 32);
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

        //let dir = target.x - weapon.x;
        //target.body.setVelocityX(dir);
    }

    ProjectileDamage(target, projectile) {
        target.Hurt(100);
        projectile.destroy();
    }

    update(time, delta) {
        this.entities.forEach(element => element.Update());
        this.CheckInputs(delta);
    }

    LoadScene(key) {
        p0Health = this.player0.health;
        p1Health = this.player1.health;
        this.scene.start(key);
    }
}

let hasRelic = false;
var defeatedBosses = 0;
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
        this.door = new SceneDoor(this, 1200, 192, 'dungeon');

        //Crea enemigos
        this.gorila = new GreatGorila(this, 500, 96, 'greatGorila');
        this.parrot = new Parrot(this, 650, 175, 'greatParrot');

        
        if (hasRelic) {
            this.player0.x = this.door.x - 80;
            this.player1.x = this.door.x - 48;
            this.player0.y = this.door.y;
            this.player1.y = this.door.y;

            this.player0.flipX = true;
            this.player1.flipX = true;

            //Dependiendo del número de bosses derrotados se activa el siguiente boss
            switch (defeatedBosses) {
                case 0:
                    this.gorila.WakeUp();
                    break;

                case 1:
                    this.parrot.WakeUp();
                    break;
                case 2:
                    this.gorila.WakeUp();
                    this.parrot.WakeUp();
                    break;

                default:
                    break;
            }

            hasRelic = false;
        } else {
            //Muestra los controles
            this.controls0 = this.add.sprite(this.player0.x - 30, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);
            this.controls0 = this.add.sprite(this.player1.x + 30, this.player1.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(1).setDepth(10);
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
        this.camera.startFollow(this.bowPlayer, true);

        this.levelId = levelX + "_" + levelY;

        this.LoadTileMap('map' + this.levelId);

        this.bg = this.add.sprite(0, 0, 'background').setOrigin(0,0).setScrollFactor(.25).setDepth(-2);





        //Añade a cada nivel los items
        switch (levelX) {
            case 1:
                //1.1
                this.stairs = new SceneStairs(this, 64, 6 * 32, 'bossRoom');
                /*if(hasRelic){
                    this.stairs.body.enable = true;
                }else{
                    this.stairs.body.enable = false;
                }*/

                //new Relic(this, 400, 6 * 32);

                this.door1 = new DungeonDoor(this, 7 * 32, 15 * 32, "2_1");
                this.door2 = new DungeonDoor(this, 65 * 32, 9 * 32, "2_2");
                break;

            case 2:
                switch (levelY) {
                    case 1:
                        //2.1
                        this.stairs = new DungeonStairs(this, 64, 6 * 32, "1_1");
                        new Relic(this, 3 * 32, 13 * 32);
                        break;

                    case 2:
                        //2.2
                        this.stairs = new DungeonStairs(this, 2 * 32, 8 * 32, "1_1");
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

        console.log(whereAreTheyComingFrom);
        //Dependiendo de de qué nivel vengan, los jugadores aparecen en un sitio u otro
        switch (whereAreTheyComingFrom) {
            case 0:
                //Aparecer en escaleras
                this.player0.x = this.stairs.x + 64;
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
                /*this.randomEnemy = new Guardian(this, x, this.player0.y - 32, 'guardian');
                this.randomEnemy.primaryTarget = this.player0;
                this.randomEnemy.WakeUp();*/
                this.randomEnemy = new Drone(this, x, this.player0.y - 32, 'drone');
                this.randomEnemy.primaryTarget = this.player0;
                this.randomEnemy.WakeUp();
            }

            x = this.player0.x - 300;
            if (x > 32) {
                this.randomEnemy = new Drone(this, x, this.player0.y - 32, 'drone');
                this.randomEnemy.primaryTarget = this.player0;
                this.randomEnemy.WakeUp();

                /*this.randomEnemy = new Ball(this, x, this.player0.y - 32, 'ball');
                this.randomEnemy.primaryTarget = this.player0;
                this.randomEnemy.WakeUp();*/
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
        this.load.image('menuBackground', '/resources/img/Interfaz/Menu/menuBackground.png');
    }

    create() {
        p0Health = 6;
        p1Health = 6;

        this.camera = this.cameras.main;
        this.EnableFullScreen();

        this.text = this.add.text(240, 250, 'PRESS TO PLAY', {
            fontFamily: '"CambriaB"',
            fontSize: '12px'
        }).setOrigin(0.5).setDepth(10);; //, stroke: '0f0f0f', strokeThickness: 20

        this.title = this.add.image(240, 40, 'title').setOrigin(0.5, 0.5).setDepth(10);
        this.bg = this.add.sprite(240, 135, 'intro').setOrigin(0.5, 0.5);

        this.input.on('pointerdown', function (event) {
            console.log(this.step);
            if (this.step == 0) {
                this.step++;
                this.bg.setFrame(this.step);
                this.title.destroy();
                this.text.destroy();

            } else if (this.step < this.steps) {
                this.step++;
                this.bg.setFrame(this.step);
            } else {
                this.step = 0;
                this.scene.start('bossRoom');
            }



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