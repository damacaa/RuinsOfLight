//https://www.youtube.com/watch?v=1P8jvnj85e4
class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);

    }

    preload() {

    }

    create() {

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

        if (cursors0.up.isDown && this.player0.body.touching.down) {
            this.player0.Jump();
        }

        if (isDown) {
            this.player0.Attack();
        }

        if (isUp) {
            this.player0.EnableAttack();
        }



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
    }

    UpdateCamera() {
        this.camera.x = this.camera.x + ((240 - this.player0.x) * this.camera.zoom - this.camera.x) * 0.1;
        this.camera.y = (135 - this.player0.y) * this.camera.zoom;
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

    PreloadPlayers() {
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

        this.load.spritesheet('p1noWeapon',
            '/resources/animations/players/p1noWeapon.png', {
            frameWidth: 64,
            frameHeight: 64
        }
        );

        this.load.spritesheet('greatGorila',
            '/resources/animations/enemies/GreatGorilaGuardian/GreatGorila.png', {
            frameWidth: 256,
            frameHeight: 256
        }
        );
    }


}

class AltarRoom extends BaseScene {
    constructor() {
        super('altarRoom');

        this.player0;
        this.player1;
        this.platforms;
    }

    preload() {
        this.PreloadPlayers();

        this.load.image('puerta', '/resources/img/Items/Arcos de Paso/Arcos de Paso.png');

        this.load.image('ground', '/resources/img/tiles/BrickWall.png');
        this.load.image('background', '/resources/img/background.png');

        this.load.spritesheet('gorilaKey',
            '/resources/animations/enemies/GreatGorilaGuardian/GreatGorila.png', {
            frameWidth: 256,
            frameHeight: 256
        }
        );

        this.load.spritesheet('gorilaProjectileKey',
            '/resources/animations/enemies/GreatGorilaGuardian/ProyectilGorila.png', {
            frameWidth: 64,
            frameHeight: 32
        }
        );
    }


    create() {
        this.projectiles = this.physics.add.group();
        this.players = this.physics.add.group();
        this.enemies = this.physics.add.group();

        //Crea puertas
        this.door = new Door(this, 700, 182, 'dungeon');

        //Crea boses
        this.gorila = new GreatGorila(this, 500, 86, 'greatGorila');

        this.gorila.WakeUp();



        //Crea jugadores
        this.player0 = new Player(this, 300, 32, 'p0noWeapon', 'p0sword');
        this.player1 = new Player(this, 64, 32, 'p1noWeapon', 'p0sword');

        this.players.add(this.player0);
        this.players.add(this.player1);


        this.player0.SetWeapon(0);
        this.player1.SetWeapon(0);





        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(336, 166, 'ground');
        this.platforms.create(400, 102, 'ground');

        for (let i = 0; i < 40; i++) {
            this.platforms.create(16 + (32 * i), 230, 'ground');
        }

        this.physics.add.collider(this.players, this.platforms);
        this.physics.add.collider(this.enemies, this.platforms);

        //let a = this.player0.CheckAttacking();

        //this.physics.add.overlap(this.hitBox, this.enemies, this.hitEnemy, null, this);
        this.physics.add.overlap(this.players, this.enemies, this.MeleeDamage, null, this);
        this.physics.add.overlap(this.players, this.projectiles, this.ProjectileDamage, null, this);


        //Configura la cámara
        this.camera = this.cameras.main;
        this.EnableFullScreen();
        //this.camera.setZoom(.5);
        this.camera.setOrigin(0.5, 0.5);

        this.camera.startFollow(this.player0, true);

    }

    MeleeDamage(player, enemy) {
        if (player.CheckAttacking()) {
            enemy.DealDamage(10);
        }

        console.log(enemy.CheckAttacking());
        if (enemy.CheckAttacking()) {
            //player.body.addV
            
        }
    }

    ProjectileDamage(player, projectile){
        //player.body.y-=20;
        player.body.setVelocityY(-450);
    }



    /*hitEnemy(hitbox, enemy) {
        if (this.player.isAttacking || this.player.isAirAttacking) {
            var temp = new Enemydeath(this, enemy.x, enemy.y);
            enemy.destroy();
            this.audioKill.play();
        }
        if (this.player0.CheckAttacking()) {
            //this.gorila.WakeUp();
            this.gorila.DealDamage(10);
        }
        enemy.DealDamage(10);
    }*/

    update(time, delta) {

        this.CheckInputs(delta);
        this.door.Check();

        this.gorila.Update();
    }

}

class Dungeons extends BaseScene {
    //https://www.youtube.com/watch?v=2_x1dOvgF1E
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/multiple-tile-sizes
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/tile-callbacks

    constructor() {
        super('dungeon');
        //this.newScene = scene.scene.add('pato', config, false);
        this.player0;
        this.player1;
    }


    preload() {

        this.PreloadPlayers();
        this.load.image('background', '/resources/img/background.png');


        this.load.tilemapTiledJSON('map', 'resources/levels/TestLevel.json');
        this.load.image('tiles', 'resources/img/Tiles/BrickWall.png');

    }

    create() {
        this.camera = this.cameras.main;




        //this.bg = this.add.image(0, 0, 'background');



        this.map = this.make.tilemap({ key: 'map' });

        this.tiles = this.map.addTilesetImage('cybernoid', 'tiles');

        this.layer = this.map.createStaticLayer(0, this.tiles, 0, 0);


        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


        this.player0 = new Player(this, 300, 32, 'p0noWeapon', 'p0sword');
        this.player1 = new Player(this, 64, 32, 'p1noWeapon', 'p0sword');

        this.camera.startFollow(this.player0, true);

        /*var controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };
    
        controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    
        //  Every time you click, shake the camera
    
        this.input.on('pointerdown', function () {
    
            
    
        }, this);*/

        this.input.once('pointerdown', function (event) {

            this.scene.start('mainMenu');

        }, this);
    }

    update(time, delta) {
        this.CheckInputs();
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

        this.add.sprite(Phaser.Math.Between(300, 600), 300, 'mech');

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