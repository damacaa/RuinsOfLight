class BaseMenuScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.loading = false;
        
    }

    update() {
        checkServer();
        inGame = false;
    }

    LoadScene(key) {
        if (!this.loading) {
            this.loading = true;
            this.cameras.main.fadeOut(500);

            this.cameras.main.once('camerafadeoutcomplete', () => {
                this.loading = false;
                this.scene.start(key);
            });
        }
    }
}


class InputName extends BaseMenuScene {

    constructor() {
        super('nameInput');
    }

    preload() {

    }

    create() {
        this.scene.launch('ui'); 
        
        this.loading = false;

        this.time.delayedCall(100, function () {
            player.nick = null;
            while (player.nick == null || player.nick.length < 1) {
                //player.nick = prompt();
                player.nick = Math.random().toString(36).substring(7).toUpperCase();;
            }

            joinGame();
        }, [], this);    
    }

    update(time, delta) {
        
        if (canJoin) { this.LoadScene('mainMenu'); }
    }
}

class MainMenu extends BaseMenuScene {
    constructor() {
        super('mainMenu');

        this.step = 0;
        this.steps = 11;

    }

    preload() {
        
    }

    create() {

        
        ResetGame();

        this.camera = this.cameras.main;
        this.EnableFullScreen();

        this.title = this.add.image(170, 40, 'title').setOrigin(0.5, 0.5).setDepth(10);
        this.bg = this.add.sprite(240, 135, 'intro').setOrigin(0.5, 0.5);

        this.newGame = this.add.image(65, 90, 'newGame').setOrigin(0.5, 0.5).setDepth(10).setInteractive();
        this.credits = this.add.image(65, 130, 'credits').setOrigin(0.5, 0.5).setDepth(10).setInteractive();
        this.records = this.add.image(65, 170, 'records').setOrigin(0.5, 0.5).setDepth(10).setInteractive();

        this.step = 0;

        this.anims.create({
            key: 'first',
            frames: this.anims.generateFrameNumbers('intro', { start: 7, end: 9 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'second',
            frames: this.anims.generateFrameNumbers('intro', { start: 10, end: 11 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'third',
            frames: this.anims.generateFrameNumbers('intro', { start: 12, end: 14 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'fourth',
            frames: this.anims.generateFrameNumbers('intro', { start: 15, end: 17 }),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'fifth',
            frames: this.anims.generateFrameNumbers('intro', { start: 18, end: 20 }),
            frameRate: 1,
            repeat: -1
        });

        this.sound.stopAll();
        this.musicBGMainMenu = this.sound.play("music", { loop: true }, { volume: 2 });

        this.newGame.on('pointerdown', function (event) {

            if (this.step == 0) {

                this.step++;
                this.bg.setFrame(this.step);
                this.title.destroy();
                this.newGame.destroy();
                this.credits.destroy();
                this.records.destroy();
                
                
                //Saltar la introducción
                this.skip = this.add.image(440, 10, 'skip').setOrigin(0.5, 0.5).setDepth(10).setInteractive();
                this.skip.on('pointerdown', function (event) {
                    this.cameras.main.fadeOut(500);

                    this.cameras.main.once('camerafadeoutcomplete', () => {
                        this.scene.start('altarRoom');
                    });
                }, this);

                this.text = this.add.text(240, 260, 'CLICK TO CONTINUE', {
                    fontFamily: '"CambriaB"',
                    fontSize: '10px'
                }).setOrigin(0.5).setDepth(10); //, stroke: '0f0f0f', strokeThickness: 20

                this.input.on('pointerdown', function (event) {

                    if (this.step < 7) {
                        this.step++;
                        this.bg.setFrame(this.step);

                        if (this.step == 4) { this.sound.play('effectIntroDoor'); }

                    } else if (this.step == 7) {
                        this.bg.anims.play('first', true);
                        this.step++;

                        this.input.on('pointerdown', function (event) {
                            this.bg.setFrame(10);
                        }, this);

                    } else if (this.step == 8) {
                        this.bg.anims.play('second', true);

                        this.step++;

                        this.input.on('pointerdown', function (event) {
                            this.bg.setFrame(12);
                        }, this);

                    } else if (this.step == 9) {
                        this.bg.anims.play('third', true);
                        this.step++;

                        this.input.on('pointerdown', function (event) {
                            this.bg.setFrame(15);
                        }, this);

                    } else if (this.step == 10) {
                        this.bg.anims.play('fourth', true);
                        this.step++;

                        this.input.on('pointerdown', function (event) {
                            this.bg.setFrame(18);
                        }, this);

                    } else if (this.step == this.steps) {
                        this.bg.anims.play('fifth', true);
                        this.step++;

                    } else {
                        this.step = 0;
                        this.cameras.main.fadeOut(500);

                        this.cameras.main.once('camerafadeoutcomplete', () => {
                            this.scene.start('altarRoom');
                        });
                    }

                }, this);
                this.sound.stopAll();
                this.musicBGMainMenu = this.sound.play("music", { loop: true }, { volume: 2 });
            }
        }, this);


        this.credits.on('pointerdown', function (event) {
            //this.scene.start('credits');
            this.scene.start('credits');
        }, this);

        this.records.on('pointerdown', function (event) {
            this.scene.start('leaderBoard');
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

class Credits extends BaseMenuScene {

    constructor() {
        super('credits');

    }

    preload() {
        

    }

    create() {

        

        this.anims.create({
            key: 'credits',
            frames: this.anims.generateFrameNumbers('endCredits', { start: 0, end: 70 }),
            frameRate: 7,
            repeat: 0
        });


        this.camera = this.cameras.main;

        this.cr = this.add.sprite(240, 135, 'endCredits').setOrigin(0.5, 0.5);

        this.cr.anims.play('credits', true);

        this.cr.once('animationcomplete', () => {
            this.scene.start('mainMenu');
        });

        this.sound.stopAll();
        this.musicBGCredits = this.sound.play("winMusic", { loop: true }, { volume: 2 });

    }

}

class GameOver extends BaseMenuScene {

    constructor() {
        super('gameOver');

    }

    preload() {

        
    }

    create() {
        

        this.camera = this.cameras.main;

        this.gO = this.add.image(240, 135, 'gameOver').setOrigin(0.5, 0.5);

        this.time.delayedCall(2000, function () {
            this.text = this.add.text(240, 250, 'CLICK TO PLAY AGAIN', {
                fontFamily: '"CambriaB"',
                fontSize: '12px'
            }).setOrigin(0.5).setDepth(10);


            this.input.on('pointerdown', function (event) {

                this.scene.start('mainMenu');


            }, this);
        }, [], this);

        this.sound.stopAll();
        this.musicBGGameOver = this.sound.play("gameOverMusic", { loop: true }, { volume: 2 });
    }
}

class LeaderBoard extends BaseMenuScene {

    constructor() {
        super('leaderBoard');
    }

    preload() {

    }

    create() {


        for (let i = 0; i < Math.min(records.length,7); i++) {
            //console.log(records[i])
            this.text = this.add.text(240, 75 + (25 * i), records[i].nombre1 + " & " + records[i].nombre2 + ": " + records[i].puntuacion, {
                fontFamily: '"PressStart2P-Regular"',
                fontSize: '12px'
            }).setOrigin(0.5).setDepth(10);
        }

        this.time.delayedCall(100, function () {

            this.input.on('pointerdown', function (event) {

                this.scene.start('mainMenu');

            }, this);
        }, [], this);

        /*this.sound.stopAll();
        this.musicBGGameOver = this.sound.play("gameOverMusic", { loop: true }, { volume: 2 });*/
    }
}