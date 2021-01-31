class BossRoom extends BaseScene {
    constructor() {
        super('bossRoom');
    }

    CreateStage() {
        if (gameMode == 1) { this.camera.startFollow(this.bowPlayer, true); } else { this.camera.startFollow(this.player0, true); }

        this.bg = this.add.sprite(0, -32, 'bossBackground').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);

        //Crea escenario
        this.LoadTileMap('bossRoom');

        //Crea puertas
        this.dungeonDoor = new SceneDoor(this, 1248, 192, 'dungeon', false);
        this.exitDoor = new SceneDoor(this, 32, 192, 'credits', true);
        this.exitDoor.Close();

        //Crea enemigos
        this.gorila = new GreatGorila(this, 500, 32, 'greatGorila');
        this.parrot = new Parrot(this, 650, 175 - 66, 'greatParrot');

        this.add.image(this.gorila.x + 8, this.gorila.y + 64 + 64 + 32, 'bossAltar').setDepth(0);
        this.add.image(this.parrot.x + 48, this.parrot.y + 64 + 19, 'bossAltar').setDepth(0);

        if (!firstTimeBoss) {
            this.player0.x = this.dungeonDoor.x - 80;
            this.player1.x = this.dungeonDoor.x - 48;
            this.player0.y = this.dungeonDoor.y;
            this.player1.y = this.dungeonDoor.y;

            this.player0.flipX = true;
            this.player1.flipX = true;
        } else {
            this.RandomRelic();

            this.controls0 = this.add.sprite(this.player0.x, this.player0.y - 32, 'Attackcontrols').setOrigin(0.5, 0.5).setFrame(0).setDepth(10);
            this.controls1 = this.add.sprite(this.player1.x, this.player1.y - 32, 'Attackcontrols').setOrigin(0.5, 0.5).setFrame(1).setDepth(10);

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

            firstTimeBoss = false;
        }

        //Dependiendo del número de bosses derrotados se activa el siguiente boss
        this.sound.stopAll();
        this.musicBGBoss = this.sound.play("music", { loop: true }, { volume: 2 });
        switch (defeatedBosses) {
            case 0:
                if (hasRelic) {
                    this.sound.stopAll();
                    this.musicBGBoss = this.sound.play("battleMusic", { loop: true }, { volume: 2 });
                    this.dungeonDoor.Close();
                    this.currentBoss = this.gorila;
                    this.sound.play("effectBaseGorila", { loop: true });
                }
                break;
            case 1:
                if (hasRelic) {
                    this.sound.stopAll();
                    this.musicBGBoss = this.sound.play("battleMusic", { loop: true }, { volume: 2 });
                    this.dungeonDoor.Close();
                    this.currentBoss = this.parrot;
                    this.sound.play("effectBaseParrot", { loop: true });
                }
                this.gorila.visible = false;
                break;

            default:
                break;
        }
    }

    UpdateStage() {
        if (this.currentBoss && !this.currentBoss.awake) {
            if (hasRelic) {
                if (Math.abs(this.currentBoss.x - this.player0.x) < 200 && Math.abs(this.currentBoss.x - this.player1.x) < 200) {
                    this.currentBoss.WakeUp();
                    hasRelic = false;
                }

            } else {
                if (defeatedBosses == 2) {
                    if (!this.exitDoor.open) {
                        createRecord(player.nick, "FRIEND", ((new Date() - startTime) / 1000));
                        this.exitDoor.Open();
                    }
                } else {
                    this.RandomRelic();
                    this.currentBoss = null;
                    this.dungeonDoor.Open();
                }
            }
        }
    }

    RandomRelic() {
        if (isOrange) {
            relicX = Math.floor(Math.random() * (numberOfLevels - 1)) + 2;
            relicY = Math.floor(Math.random() * Math.pow(2, relicX - 1)) + 1;
            SendRelicPos(relicX, relicY);
        }
    }
}