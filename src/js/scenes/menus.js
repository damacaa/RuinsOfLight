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
        this.load.spritesheet('block',
            'resources/img/input/block.png', {
            frameWidth: 64,
            frameHeight: 32
        }
        );
    }

    create() {
        this.scene.launch('ui');

        this.loading = false;
        this.ok = false;

        this.bground = this.add.sprite(0, 0, 'endCredits').setFrame(10).setOrigin(0);

        //https://labs.phaser.io/edit.html?src=src/input/keyboard/enter%20name.js


        for (let index = 0; index < game.width * 32; index += 159) {
            this.add.sprite(index, 0, 'background').setOrigin(0, 0);
        }

        let chars = [
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z','_','.', 'DEL', 'OK'
        ];

        let buttons = [];

        let x = 80;
        let y = 130;

        let name = '';

        this.add.text(240, 40, "Enter your name", {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '10px',
            color: '#eeeeba',
            align: 'center'
        }).setOrigin(0.5);

        let playerText = this.add.text(240, 85, name, {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '32px',
            color: '#eeeeba',
            align: 'center'
        }).setOrigin(0.5);

        for (let char of chars) {
            let c = this.add.text(x, y, char, {
                fontFamily: '"PressStart2P-Regular"',
                fontSize: '16px',
                color: '#eeeeba',
                align: 'center'
            });

            c.setAlign('center');

            c.setOrigin(0.5);

            switch (char) {
                case 'DEL':

                    c.Press = function () {
                        if (name.length > 0) {
                            name = name.slice(0, -1);
                            playerText.text = name;
                        }
                    }

                    c.AdjustBlock = function () {
                        block.setFrame(1);
                    }

                    x += 55;

                    break;

                case 'OK':

                    c.Press = function () {
                        if (name.length > 0) {
                            if (!this.ok) {
                                player.nick = name;
                                joinGame();
                                this.ok = true;
                            }
                        }
                    }

                    c.AdjustBlock = function () {
                        block.setFrame(1);
                    }

                    break;
                case '.':
                    c.Press = function () {
                        if (name.length < 10) {
                            name += char;
                            playerText.text = name;
                        }
                    }

                    c.AdjustBlock = function () {
                        block.setFrame(0);
                    }

                    x = 350;
                    y += 25;
                    break;

                default:
                    c.Press = function () {

                        if (name.length < 10) {
                            name += char;
                            playerText.text = name;
                        }

                    }
                    c.AdjustBlock = function () {
                        block.setFrame(0);
                    }

                    x += 30;
                    if (x > 410) {
                        x = 80;
                        y += 35;
                    }
                    break;
            }

            c.setInteractive();
            c.on('pointerup', function (pointer, x, y) {

                c.Press();

            }, this);

            c.on('pointerover', function (pointer, x, y) {

                block.x = c.x;
                block.y = c.y;

                c.AdjustBlock();
            }, this);

            buttons.push(c);
        }

        this.input.keyboard.on('keyup', function (event) {


            if (event.keyCode === 13 || event.keyCode === 32) {
                buttons[index].Press();
            }else if(event.keyCode === 13){

            }

            block.x = buttons[index].x - 2;
            block.y = buttons[index].y - 2;

            buttons[index].AdjustBlock();
        });

        let index = 0;
        let block = this.add.sprite(buttons[index].x, buttons[index].y, 'block').setOrigin(0.5);
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
        this.leaderBoard = this.add.image(65, 130, 'leaderBoard').setOrigin(0.5, 0.5).setDepth(10).setInteractive();
        this.credits = this.add.image(65, 170, 'credits').setOrigin(0.5, 0.5).setDepth(10).setInteractive();


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
                this.leaderBoard.destroy();


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


            this.scene.start('credits');
        }, this);

        this.leaderBoard.on('pointerdown', function (event) {


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
        this.lB = this.add.image(240, 135, 'leaderBoardBackground').setOrigin(0.5, 0.5);

        this.back = this.add.image(65, 220, 'continue').setOrigin(0.5, 0.5).setDepth(10).setInteractive();

        this.back.on('pointerdown', function (event) {

            this.scene.start('mainMenu');
        }, this);





        for (let i = 0; i < Math.min(records.length,7); i++) {
            var hour=0;
            var min=0;
            var seg=0;
            var points=records[i].puntuacion;
            //console.log(records[i])
           while (points>0){
            if (points>=3600){
                hour++;
                var points= points-3600;
            }else if (points<3600&&points>=60){

                min++;
                var points=points-60;
            } else if (points<60&&points>0){

                seg++;
                var points=points-1;
            }
           }

            this.text = this.add.text(240, 55 + (25 * i), records[i].nombre1 + " & " + records[i].nombre2 + ": " + hour + " horas " + min + " minutos " + seg + " segundos " ,{
                fontFamily: '"PressStart2P-Regular"',
                fontSize: '8px',
                color: '#eeeeba'

            }).setOrigin(0.5).setDepth(10);


        }
    }
}
