class AltarRoom extends BaseScene {
    constructor() {
        super('altarRoom');
        this.swordAltar;
        this.bowAltar;

        this.center;
        this.loading = false;
    }

    CreateStage() {
        this.player0.x = 80;
        this.player1.x = 100;

        this.bg = this.add.sprite(0, -32, 'bossBackground').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);
        //Crea escenario
        this.LoadTileMap('altarRoom');

        this.center = this.add.image(256, 64);
        this.center.visible = false;

        this.bowAltar = new Altar(this, 200, 191, 'bowAltar', 'bow');

        this.swordAltar = new Altar(this, 288, 191, 'swordAltar', 'sword');

        this.bowAltar.otherAltar = this.swordAltar;
        this.swordAltar.otherAltar = this.bowAltar;

        //Muestra los controles
        this.controls0 = this.add.sprite(this.player0.x - 30, this.player0.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);
        this.controls1 = this.add.sprite(this.player1.x + 30, this.player1.y - 32, 'controls').setOrigin(0.5, 0.5).setFrame(1).setDepth(10);

        this.tweens.add({
            targets: this.controls0,
            y: this.controls0.y - 5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.controls1,
            y: this.controls1.y - 5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        //Crea puertas
        this.door = new SceneDoor(this, 384, 160, 'bossRoom');
        this.door.Close();

        this.sound.stopAll();
        this.musicBGAltar = this.sound.play("music", { loop: true }, { volume: 2 });
    }

    UpdateStage(time, delta) {
        if (!this.loading && this.bowAltar.activated && this.swordAltar.activated && this.bowAltar.player != this.swordAltar.player) {

            this.loading = true;

            this.time.delayedCall(1000, function () {
                if (this.bowAltar.activated && this.swordAltar.activated && this.bowAltar.player != this.swordAltar.player) {
                    this.cameras.main.flash(1000);

                    this.swordAltar.done = true;
                    this.bowAltar.done = true;

                    this.swordAltar.player.SetWeapon(1);
                    this.bowAltar.player.SetWeapon(2);

                    this.swordAltar.Deactivate();
                    this.bowAltar.Deactivate();

                    this.swordAltar.weapon.destroy();
                    this.bowAltar.weapon.destroy();

                    if (this.swordPlayer == this.player0) {
                        p0Weapon = 1;
                        p1Weapon = 2;
                    } else {
                        p0Weapon = 2;
                        p1Weapon = 1;
                    }

                    this.loading = false;

                    this.door.Open();
                } else { this.loading = false; }
            }, [], this);
        }
    }
}