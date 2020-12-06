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
        frameWidth: 64,
        frameHeight: 63
    }
    );

        //Escenario
        this.load.image('puerta', '/resources/img/Items/Arcos de Paso/Arcos de Paso.png');
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
        this.camera.startFollow(this.player0, true);

        this.CreateStage();

        //Añade colisiones
        this.physics.add.collider(this.players, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);


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
        /*if (player.CheckAttacking()) {
            enemy.Hurt(10);
        }

        if (enemy.CheckAttacking()) {
            player.Hurt();
            //player.body.setVelocityX((player.x - enemy.x) * 1);
        }*/

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
}

class AltarRoom extends BaseScene {
    constructor() {
        super('altarRoom');


    }

    CreateStage() {
        this.camera.setOrigin(0.5, 0.75);
        //this.bg = this.add.image(0, 0, 'background');

        //Crea escenario
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(366, 166, 'ground');
        this.platforms.create(400, 102, 'ground');

        for (let i = 0; i < 40; i++) {
            this.platforms.create(16 + (32 * i), 230, 'ground');
        }

        //Crea puertas
        this.door = new Door(this, 1200, 182, 'dungeon');


        //Crea enemigos
        this.gorila = new GreatGorila(this, 500, 86, 'greatGorila');

        this.parrot = new Parrot(this, 800, 0, 'greatParrot');

        this.ball = new Ball(this, 450, 100, 'ball');
        this.ball.WakeUp();
    }
}

class Dungeons extends BaseScene {
    //https://www.youtube.com/watch?v=2_x1dOvgF1E
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/multiple-tile-sizes
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/tile-callbacks

    constructor() {
        super('dungeon');
    }

    preload() {
        this.load.image('atlas', 'resources/levels/Tile_sheet.png');
        this.load.tilemapTiledJSON('map', 'resources/levels/SueloNivel1.json');
        this.load.tilemapTiledJSON('map2', 'resources/levels/SueloNivel2.json');
        this.load.tilemapTiledJSON('map3', 'resources/levels/SueloNivel3.json');
    }

    CreateStage() {
        this.map = this.make.tilemap({ key: 'map3' });
        this.groundTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.groundLayer = this.map.createStaticLayer('Suelo', this.groundTiles, 0, 0);



        //Colisiones
        this.groundLayer.setCollisionBetween(1, 27);
        this.physics.add.collider(this.player0, this.groundLayer);
        this.physics.add.collider(this.player1, this.groundLayer);
        this.physics.add.collider(this.enemies, this.groundLayer);


        this.input.once('pointerdown', function (event) {

            this.scene.start('mainMenu');

        }, this);

        for (let index = 0; index < 10; index++) {
            this.randomEnemy = new Enemy(this, 100*index+100, 50, '');

        }

    }

}

class MainMenu extends Phaser.Scene {

    constructor() {
        super('mainMenu');
        //this.newScene = scene.scene.add('pato', config, false);
    }

    preload() {
        this.load.image('mech', '/resources/img/tiles/BrickWall.png');
    }

    create() {
        this.camera = this.cameras.main;
        this.EnableFullScreen();

        this.add.text(240, 135, 'PRESS TO PLAY', {
            fontFamily: '"Press Start 2P"',
            fontSize: '20px'
        }).setOrigin(0.5); //, stroke: '0f0f0f', strokeThickness: 20


        this.input.once('pointerdown', function (event) {

            //var newScene = scene.scene.add(key, sceneConfig, autoStart, data);
            //let nextScene = game.scene.add('pato',config,true);
            this.scene.start('altarRoom');

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

} 