class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'mainMenu' });
        //this.newScene = scene.scene.add('pato', config, false);
    }

    preload() {
        this.load.image('mech', '/resources/img/tiles/BrickWall.png');
    }

    create() {
        this.add.sprite(Phaser.Math.Between(300, 600), 300, 'mech');

        this.add.text(240, 135, 'PRESS TO PLAY', { fontFamily: '"Press Start 2P"', fontSize: '20px' }).setOrigin(0.5);//, stroke: '0f0f0f', strokeThickness: 20


        this.input.once('pointerdown', function (event) {

            //var newScene = scene.scene.add(key, sceneConfig, autoStart, data);
            //let nextScene = game.scene.add('pato',config,true);
            this.scene.start('altarRoom');

        }, this);
    }
}



class AltarRoom extends Phaser.Scene {



    constructor(sceneKey) {
        if (sceneKey) {
            super({ key: sceneKey });
        } else {
            super({ key: 'altarRoom' });
        }

        this.player0;
        this.player1;
        this.platforms;
    }

    preload() {
        this.load.spritesheet('p0noWeapon',
            '/resources/animations/players/p0noWeapon.png',
            { frameWidth: 64, frameHeight: 64 }
        );

        this.load.spritesheet('p0sword',
            '/resources/animations/players/p0Sword.png',
            { frameWidth: 64, frameHeight: 64 }
        );

        this.load.spritesheet('p1noWeapon',
            '/resources/animations/players/p1noWeapon.png',
            { frameWidth: 64, frameHeight: 64 }
        );

        this.load.spritesheet('greatGorila',
            '/resources/animations/enemies/GreatGorilaGuardian/GreatGorila.png',
            { frameWidth: 256, frameHeight: 256 }
        );

        this.load.image('ground', '/resources/img/tiles/BrickWall.png');
    }


    create() {
        this.player0 = new Player({ scene: this, x: 32, y: 32 }, 'p0noWeapon', 'p0sword');
        this.player1 = new Player({ scene: this, x: 64, y: 32 }, 'p1noWeapon', 'p0sword');

        this.gorila = this.add.sprite(260 , 86, 'greatGorila').setOrigin(0, 0.5);

        //player0.SetWeapon(1);


        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(200, 166, 'ground');

        this.platforms.create(264, 102, 'ground');

        for (let i = 0; i < 20; i++) {
            this.platforms.create(16 + (32 * i), 230, 'ground');
        }

        this.physics.add.collider(this.player0, this.platforms);
        this.physics.add.collider(this.player1, this.platforms);

        this.input.once('pointerdown', function (event) {

            this.scene.start('mainMenu');

        }, this);

    }



    update(time, delta) {
        let cursors1 = this.input.keyboard.createCursorKeys();
        let cursors0 = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D,
                attack: Phaser.Input.Keyboard.KeyCodes.E
            });


            var keyObj = this.input.keyboard.addKey('E');  // Get key object
            var isDown = keyObj.isDown;
            var isUp = keyObj.isUp;


        if (cursors0.left.isDown) {
            this.player0.Run(-1);
        }
        else if (cursors0.right.isDown) {
            this.player0.Run(1);
        }
        else {
            this.player0.Run(0);
        }

        if (cursors0.up.isDown && this.player0.body.touching.down) {
            this.player0.Jump();
        }

        if(isDown){
            console.log("Attacking")
            this.player0.Attack();
        }




        if (cursors1.left.isDown) {
            this.player1.Run(-1);
        }
        else if (cursors1.right.isDown) {
            this.player1.Run(1);
        }
        else {
            this.player1.Run(0);
        }

        if (cursors1.up.isDown && this.player1.body.touching.down) {
            this.player1.Jump();
        }

        //console.log(goingRight);
    }

}

