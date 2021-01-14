let ui;

class UI extends BaseMenuScene {

    constructor() {
        super('ui');
        this.healthBar;
        this.bossBar;

        this.playing = false;
        this.pause = false;
        this.maxNames = 7;
    }

    preload() {
        this.load.spritesheet('signal',
            'resources/img/Interfaz/Menu/signal.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );

        this.load.image('continue', 'resources/img/Interfaz/Menu/Buttons6.png');
    }
    create() {
        ui = this;

        this.camera = this.cameras.main;

        this.healthBar = new PlayerHealthBar(this, 40, 10, 'vidas').setScrollFactor(0).setOrigin(0, 0);

        this.text = this.add.text(170, 40, "", {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '8px',
            color: '#eeeeba',
            align: 'center'
        }).setDepth(10).setScrollFactor(0).setLineSpacing(7);

        this.pauseButton = this.add.sprite(435, 228, 'signal').setOrigin(0).setDepth(10).setInteractive();
        this.pauseButton.on('pointerdown', function (event) {
            this.Pause();
        }, this);

        this.continueButton = this.add.image(244, 220, 'continue').setOrigin(0.5, 0.5).setDepth(10).setInteractive().setActive(false).setVisible(false);
        this.continueButton.on('pointerdown', function (event) {
            this.Continue();
        }, this);

        ///this.rect = this.add.rectangle(0, 0, 480, 270, 0x000);
        //this.rect.setOrigin(0).setActive(false).setVisible(false);
    this.bground = this.add.sprite(0, 0, 'endCredits').setFrame(10).setOrigin(0).setDepth(9);
    this.bground.setActive(false).setVisible(false);

        this.Continue();

    }

    Pause() {
        
        this.pauseButton.setActive(false).setVisible(false);
        this.continueButton.setActive(true).setVisible(true);
        //this.rect.setActive(true).setVisible(true);
        this.bground.setActive(true).setVisible(true);
        this.text.setActive(true).setVisible(true);
        this.healthBar.setVisible(false);

    }

    Continue() {
        this.pauseButton.setActive(true).setVisible(true);
        this.continueButton.setActive(false).setVisible(false);
        //this.rect.setActive(false).setVisible(false);
        this.bground.setActive(false).setVisible(false);
        this.text.setActive(false).setVisible(false);

        this.healthBar.setVisible(inGame);

        //this.healthBar.Update();

    }

    update() {
        if (this.text.active) {
            if (isOnline) {
                if (players.length == 1) {
                    this.text.text = players.length + " player online:\n";
                } else {
                    this.text.text = players.length + " players online:\n";
                }

                for (let i = 0; i < Math.min(players.length, this.maxNames); i++) {
                    if (players[i].nick == player.nick) {
                        this.text.text += "\n" + players[i].nick + " (You)";
                    } else {
                        this.text.text += "\n" + players[i].nick;
                    }
                }

                let excess = players.length - this.maxNames;
                if (excess > 0) { this.text.text += "\nAnd " + excess + " others." }

            } else {
                this.text.text = "Offline";
            }

        }
        if(this.pauseButton.active){
            if(isOnline){
                this.pauseButton.setFrame(2);
            }else{
                this.pauseButton.setFrame(3);
            }
            if(!inGame){
                this.healthBar.setVisible(false);
            }
        }

    }


    Clear() {
        this.healthBar.Hide();

    }
}