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

        let cursors1 = this.input.keyboard.createCursorKeys();
        let cursors0 = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            attack: Phaser.Input.Keyboard.KeyCodes.E
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
            console.log("Attacking")
            this.player0.Attack();
        }




        if (cursors1.left.isDown) {
            this.player1.Run(-1, delta);
        } else if (cursors1.right.isDown) {
            this.player1.Run(1, delta);
        } else {
            this.player1.Run(0, delta);
        }

        if (cursors1.up.isDown && this.player1.body.touching.down) {
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

            this.cameras.main.shake(500);

        }, this);
    }

    PreloadPlayers() {
        this.load.spritesheet('p0noWeapon',
            '/resources/animations/players/p0noWeapon.png', {
            frameWidth: 64,
            frameHeight: 64
        }
        );

        this.load.spritesheet('p0sword',
            '/resources/animations/players/p0Sword.png', {
            frameWidth: 64,
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

class MainMenu extends BaseScene {
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

        this.load.image('ground', '/resources/img/tiles/BrickWall.png');
        this.load.image('background', '/resources/img/background.png');
    }


    create() {

        //this.scale.resize(2000, 270);

        //this.bg = this.add.image(0, 0, 'background');
        //this.game.Align.scaleToGameW(bg, 2);
        //this.bg.setScrollFactor(0.5);

        this.gorila = this.add.sprite(460, 86, 'greatGorila').setOrigin(0, 0.5);

        //Crea jugadores
        this.player0 = new Player({
            scene: this,
            x: 32,
            y: 32
        }, 'p0noWeapon', 'p0sword');
        this.player1 = new Player({
            scene: this,
            x: 64,
            y: 32
        }, 'p1noWeapon', 'p0sword');

        //player0.SetWeapon(1);

       /* this.door = new Door({
            scene: this,
            x: 500,
            y: 166
        }, this.player0, this.player1, 'dungeon');
*/

        
        


        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(336, 166, 'ground');
        this.platforms.create(400, 102, 'ground');

        for (let i = 0; i < 40; i++) {
            this.platforms.create(16 + (32 * i), 230, 'ground');
        }

        this.physics.add.collider(this.player0, this.platforms);
        this.physics.add.collider(this.player1, this.platforms);


        //Configura la cámara
        this.camera = this.cameras.main;
        this.EnableFullScreen();
        //this.camera.setZoom(3);
        //this.camera.setOrigin(0, 0);
        //this.cameras.main.setBounds(0, 0, 1000, 300);
        //console.log(window.glob);
        this.camera.startFollow(this.player0, true);

    }

    update(time, delta) {

        this.CheckInputs(delta);
        /*if (this.door.Check()) {
            this.scene.start('dungeon');
        }*/
        //this.UpdateCamera();
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


        this.player0 = new Player({
            scene: this,
            x: 32,
            y: 32
        }, 'p0noWeapon', 'p0sword');
        this.player1 = new Player({
            scene: this,
            x: 64,
            y: 32
        }, 'p1noWeapon', 'p0sword');

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