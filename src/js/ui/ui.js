let ui;

class UI extends BaseMenuScene {

    constructor() {
        super('ui');
        this.healthBar;
        this.bossBar;

        this.playing = false;

        this.maxNames = 5;
    }

    create() {
        ui = this;

        this.camera = this.cameras.main;

        this.healthBar = new PlayerHealthBar(this, 40, 10, 'vidas').setScrollFactor(0).setDepth(10).setOrigin(0, 0);

        //this.healthBar.visible = false
        //this.healthBar.Update();

        this.text = this.add.text(340, 20, "", {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '8px'
        }).setDepth(10).setScrollFactor(0).setLineSpacing(7);
    }

    update() {
        if (isOnline) {
            this.text.text = players.length + " players online";

            for (let i = 0; i < Math.min(players.length, this.maxNames); i++) {

                if (players[i].nick == player.nick) {this.text.text += "\n " + players[i].nick + " (You)";
             } else {
                    this.text.text += "\n " + players[i].nick;
                }
            }

            let excess = players.length - this.maxNames;

            if (excess > 0) { this.text.text += "\nAnd " + excess + " others." }

        } else {
            this.text.text = "Offline";
        }
    }

    Clear() {
        this.healthBar.Hide();

    }
}