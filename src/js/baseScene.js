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

        this.load.spritesheet('swordAltar',
            '/resources/img/Items/Altares/AltarEspada.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );


        this.load.spritesheet('bowAltar',
            '/resources/img/Items/Altares/AltarArco.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );

        this.load.spritesheet('puertaEntrada',
            '/resources/img/Items/Arcos de Paso/Entrada.png', {
            frameWidth: 64,
            frameHeight: 64
        }
        );

        //Escenario
        this.load.image('puerta', '/resources/img/Items/Arcos de Paso/Arco de Paso.png');
        this.load.image('escalerasL', '/resources/img/Items/Escaleras/escaleras_laterales.png');
        this.load.image('wall', '/resources/img/tiles/BrickWall.png');
        this.load.image('bossBackground', '/resources/img/bossBackground.png');
        this.load.image('background', '/resources/img/background.png');
        this.load.image('relic', '/resources/img/Items/Reliquia/Reliquia.png')
        this.load.image('sword', '/resources/img/Items/Weapons/Sword.png')
        this.load.image('bow', '/resources/img/Items/Weapons/Bow.png')

        this.load.image('atlas', 'resources/levels/Tile_sheet.png');
        this.load.tilemapTiledJSON('altarRoom', 'resources/levels/AltarRoom.json');
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

        this.load.spritesheet('Attackcontrols',
            '/resources/img/Interfaz/AttackControls.png', {
            frameWidth: 17,
            frameHeight: 18
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
        this.player1 = new Player(this, 192, 192, 'p1noWeapon', 'p1sword', 'p1bow', p1Health);

        this.players.add(this.player0);
        this.players.add(this.player1);

        this.player0.SetWeapon(p0Weapon);
        this.player1.SetWeapon(p1Weapon);


        //Configura la cámara
        this.camera = this.cameras.main;
        this.EnableFullScreen();
        //this.camera.setZoom(.5);
        this.camera.setOrigin(0.5, 0.5);
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

    UpdateStage(time, delta) { }

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

        this.UpdateStage(time, delta);
    }

    LoadScene(key) {
        this.entities = [];
        p0Health = this.player0.health;
        p1Health = this.player1.health;
        this.scene.start(key);
    }
}