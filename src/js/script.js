/*var canvas = document.getElementById("gameCanvas");
var contexto = canvas.getContext("2d");*/

window.onload = function () {

    var config = {
        type: Phaser.AUTO,
        width: 480,
        height: 270,
        pixelArt: true,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 981 },
                debug: false
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    }

    var game = new Phaser.Game(config);
}

function preload() {
    this.load.spritesheet('p0noWeapon',
        '/resources/animations/players/p0noWeapon.png',
        { frameWidth: 64, frameHeight: 64 }
    );

    this.load.image('ground', '/resources/img/tiles/BrickWall.png');

    /*this.load.bitmapFont('atari', 'assets/fonts/bitmap/atari-classic.png', 'assets/fonts/bitmap/atari-classic.xml');
    this.load.spritesheet('veg', 'assets/sprites/fruitnveg32wh37.png', { frameWidth: 32, frameHeight: 37 });
    this.load.image('mushroom', 'assets/sprites/mine.png');
    this.load.tilemapTiledJSON('map1', 'assets/tilemaps/maps/super-mario.json');
    this.load.image('tiles1', 'assets/tilemaps/tiles/super-mario.png');*/

}

function create() {
    player0 = this.physics.add.sprite(16, 32, 'p0noWeapon');
    player0.setSize(16, 32);
    player0.body.offset.x = 16;
    player0.body.offset.y = 32;

    //player0.setBounce(0.2);
    player0.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('p0noWeapon', { start: 12, end: 20 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: this.anims.generateFrameNumbers('p0noWeapon', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('p0noWeapon', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    platforms = this.physics.add.staticGroup();

    platforms.create(80, 166, 'ground');

    for (i = 0; i < 20; i++) {
        platforms.create(16 + (32 * i), 230, 'ground');
    }

    this.physics.add.collider(player0, platforms);
}

function update(time, delta) {

    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
        player0.setVelocityX(-160);

        player0.anims.play('left', true);

    }
    else if (cursors.right.isDown) {
        player0.setVelocityX(160);

        player0.anims.play('right', true);
    }
    else {
        player0.setVelocityX(0);

        player0.anims.play('turn');
    }

    if (cursors.up.isDown && player0.body.touching.down) {
        player0.setVelocityY(-330);
    }
}
