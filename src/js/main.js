window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        pixelArt: true,
        roundPixels: false,
        scale: {
            mode: Phaser.Scale.FIT,// Phaser.Scale.FIT || Phaser.Scale.RESIZE
            parent: 'phaser-example',
            width: 480,
            height: 270
        },
        physics: {
            default: 'arcade',

            arcade: {
                gravity: { y: 981 },
                //debug: true
            }
        },
        scene: [MainMenu, AltarRoom, BossRoom, Dungeons, GameOver, Credits]
    }

    var game = new Phaser.Game(config);
}

