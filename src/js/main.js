
var game;
var config;
window.onload = function () {

    config = {
        type: Phaser.AUTO,
        pixelArt: true,
        roundPixels: false,
        scale: {
            mode: Phaser.Scale.FIT,// Phaser.Scale.RESIZE
            parent: 'phaser-example',
            width: 480,
            height: 270
        },
        physics: {
            default: 'arcade',
            
            arcade: {
                gravity: { y: 981 },
                debug: true
            }
        },
        scene: [ MainMenu,AltarRoom, Dungeons ]
    }

    game = new Phaser.Game(config);

    game.set
}

function preload() {
    /*this.load.spritesheet('p0noWeapon',
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

    this.load.image('ground', '/resources/img/tiles/BrickWall.png');*/
}

/*function create(){
    var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen)
            {
                button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else
            {
                button.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);
}*/


/*var goingRight;
function create() {

    player0 = new Player({ scene: this, x: 32, y: 32 }, 'p0noWeapon','p0sword');
    player1 = new Player({ scene: this, x: 64, y: 32 }, 'p1noWeapon','p0sword');

//player0.SetWeapon(1);
    

    platforms = this.physics.add.staticGroup();

    platforms.create(200, 166, 'ground');

    platforms.create(264, 102, 'ground');

    for (i = 0; i < 20; i++) {
        platforms.create(16 + (32 * i), 230, 'ground');
    }

    this.physics.add.collider(player0, platforms);
    this.physics.add.collider(player1, platforms);

}



function update(time, delta) {

    /*var keyObj = this.input.keyboard.addKey('W');  // Get key object
    var isDown = keyObj.isDown;
    var isUp = keyObj.isUp;

    console.log(isDown);

    cursors1 = this.input.keyboard.createCursorKeys();
    cursors0  = this.input.keyboard.addKeys(
        {up:Phaser.Input.Keyboard.KeyCodes.W,
        down:Phaser.Input.Keyboard.KeyCodes.S,
        left:Phaser.Input.Keyboard.KeyCodes.A,
        right:Phaser.Input.Keyboard.KeyCodes.D});

    if (cursors0.left.isDown) {
     player0.Run(-1);
    }
    else if (cursors0.right.isDown) {
        player0.Run(1);
    }
    else {
        player0.Run(0);
    }

    if (cursors0.up.isDown && player0.body.touching.down) {
        player0.Attack();
    }




    if (cursors1.left.isDown) {
        player1.Run(-1);
       }
       else if (cursors1.right.isDown) {
           player1.Run(1);
       }
       else {
           player1.Run(0);
       }
   
       if (cursors1.up.isDown && player1.body.touching.down) {
           player1.Jump();
       }

    //console.log(goingRight);
}*/


