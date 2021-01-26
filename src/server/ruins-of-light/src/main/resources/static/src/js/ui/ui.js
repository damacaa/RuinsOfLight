let ui;

class UI extends BaseMenuScene {
    constructor() {
        super('ui');
        this.healthBar;
        this.bossBar;

        this.playing = false;
        this.pause = false;
        this.maxNames = 15;

        this.buttons = [];
    }

    create() {
        ui = this;

        this.camera = this.cameras.main;

        this.healthBar = new PlayerHealthBar(this, 40, 10, 'vidas').setScrollFactor(0).setOrigin(0, 0);

        this.text = this.add.text(460, 250, "", {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '7px',
            color: '#eeeeba',
            align: 'left'
        }).setDepth(10).setOrigin(1, 1).setScrollFactor(0).setLineSpacing(4);
    }

    update() {
        if (this.text.active) {
            if (isOnline) {
                if (players.length == 1) {
                    this.text.text = players.length + " player online:";
                } else {
                    this.text.text = players.length + " players online:";
                }

                for (let i = 0; i < Math.min(players.length, this.maxNames); i++) {
                    this.text.text += "\n   " + players[i].nick;
                    if (players[i].nick == player.nick) {
                        this.text.text += " (You)";
                    }
                }

                let excess = players.length - this.maxNames;
                if (excess > 0) {
                    this.text.text += "\nAnd " + excess + " others."
                }
            } else {
                this.text.text = "Offline";
            }
        }
    }

    EnableGameUI() {
        if (this.buttons.length == 0) {
            let x = 410;
            let y = 210;
            for (let i = 0; i < 9; i++) {
                let b = this.add.sprite(x, y, 'emoji').setFrame(i).setOrigin(0).setDepth(9).setInteractive();
                b.on('pointerdown', function (event) {
                    createChat(i, currentScene.sceneIdx.toString() + levelX.toString() + levelY.toString(), currentScene.player0.x, currentScene.player0.y);
                }, this);

                x += 18;

                if (i == 2 || i == 5) {
                    x = 410;
                    y += 18;
                }
            }
        }

        this.text.setOrigin(0, 1);
        this.text.x = 20;
        this.text.y = 260;
        this.maxNames = 4;

        this.healthBar.setVisible(true);
    }

    EnableMenuUI() {
        this.text.setOrigin(1, 1);
        this.text.x = 460;
        this.text.y = 260;
        this.maxNames = 15;

        this.healthBar.setVisible(false);
    }
}