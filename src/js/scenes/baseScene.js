//https://www.youtube.com/watch?v=1P8jvnj85e4
function SkipRelic() {
    skip = true;
    hasRelic = true;
}

function ResetGame() {
    p0Health = 6;
    p1Health = 6;

    p0Weapon = 0;
    p1Weapon = 0;

    levelX = 1;
    levelY = 1;
    whereAreTheyComingFrom = 0;

    hasRelic = false;
    firstTimeBoss = true;
    defeatedBosses = 0;

    godMode = true;
    skip = false;

    loadRecords();
}

class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);

        this.player0;
        this.player1;
        this.swordPlayer;
        this.bowPlayer;

        this.playerProjectiles;
        this.enemyProjectiles;
        this.players;
        this.enemies;
        this.health;

        this.entities = [];
        this.messages = [];

        this.fading;

        this.sceneIdx = sceneCount;
        sceneCount++;

        this.gamepad;
    }

    preload() {

    }

    create() {
        ui.EnableGameUI();
        currentScene = this;

        //Crea listas
        this.playerProjectiles = this.physics.add.group();
        this.enemyProjectiles = this.physics.add.group();
        this.players = this.physics.add.group();
        this.enemies = this.physics.add.group();

        //Crea jugadores
        if (isOrange) { this.player0 = new Player(this, 128, 192, 'p0noWeapon', 'p0sword', 'p0bow', p0Health); } else {
            this.player0 = new Player(this, 128, 192, 'p1noWeapon', 'p1sword', 'p1bow', p0Health);
        }

        this.player0.SetWeapon(p0Weapon);
        this.players.add(this.player0);

        this.camera = this.cameras.main;
        this.EnableFullScreen();
        this.camera.setOrigin(0.5, 0.5);
        this.camera.setBackgroundColor('rgba(21, 7, 4, 1)');
        this.camera.setRenderToTexture(customPipeline);//Activa el shader

        switch (gameMode) {
            case 0:
                //0 single player 
                break;
            case 1:
                //1 local multiplayer 
                if (isOrange) { this.player1 = new Player(this, 0, 0, 'p1noWeapon', 'p1sword', 'p1bow', p1Health); } else {
                    this.player1 = new Player(this, 0, 0, 'p0noWeapon', 'p0sword', 'p0bow', p1Health);
                }
                this.player1.SetWeapon(p1Weapon);
                //Configura las cámaras
                this.camera1 = this.cameras.add(250, 10, 220, 115);
                this.camera1.setOrigin(0.5, 0.5).setBackgroundColor('rgba(21, 7, 4, 1)');

                this.players.add(this.player1);
                if (this.swordPlayer) {
                    this.camera1.startFollow(this.swordPlayer);
                }
                this.camera1.visible = false;
                this.camera1.setRenderToTexture(customPipeline);
                this.camera1.fadeIn(500);
                break;
            case 2:
                //2 online multiplayer
                if (isOrange) { this.player1 = new FakePlayer(this, 240, 135, 'p1noWeapon', 'p1sword', 'p1bow', p1Health); } else {
                    this.player1 = new FakePlayer(this, 240, 135, 'p0noWeapon', 'p0sword', 'p0bow', p1Health);
                }
                this.player1.visible = false;
                this.player1.SetWeapon(p1Weapon);
                break;
            default:
                break;
        }

        this.player0.id = 0;
        this.player1.id = 1;

        //Crea el escenario
        this.CreateStage();

        this.physics.add.overlap(this.players, this.enemyProjectiles, this.ProjectileDamage, null, this);
        this.physics.add.overlap(this.enemies, this.playerProjectiles, this.ProjectileDamage, null, this);

        this.fading = false;
        this.camera.fadeIn(500);
        this.camera.once('camerafadeincomplete', () => {
            this.fading = false;
        });

        ui.healthBar.Update();

        this.points = [];

        for (let i = 0; i < Math.min(this.map.width * this.map.height, 10000); i++) {
            let rect = this.add.rectangle(Math.random() * this.map.width * 32, Math.random() * this.map.height * 32, 1, 1, 0xD79968).setDepth(10)
            rect.vX = 0;
            rect.vY = 0;

            this.tweens.add({
                targets: rect,
                y: rect.y + 5,
                alpha: 0.5,
                duration: 2500,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });

            this.points.push(rect);
        }
        this.messages = [];
        inGame = true;
    }

    LoadTileMap(key) {
        this.platforms = this.physics.add.staticGroup();

        this.map = this.make.tilemap({ key: key });
        this.wallTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.wallLayer = this.map.createStaticLayer('Pared', this.wallTiles, 0, 0).setDepth(-1);

        this.groundTiles = this.map.addTilesetImage('Tile_sheet', 'atlas');
        this.groundLayer = this.map.createStaticLayer('Suelo', this.groundTiles, 0, 0).setDepth(4);

        //Colisiones
        this.groundLayer.setCollisionBetween(1, 34);

        this.physics.add.collider(this.players, this.groundLayer);
        this.physics.add.collider(this.enemies, this.groundLayer);

        this.camera.setBounds(0, 0, this.map.width * 32, this.map.height * 32);

        if (gameMode != 2) { this.camera1.setBounds(0, 0, this.map.width * 32, this.map.height * 32); }

        this.physics.add.collider(this.playerProjectiles, this.groundLayer);
        this.physics.add.overlap(this.enemyProjectiles, this.groundLayer, this.ProjectileHitsWall, null, this);
    }

    CheckInputs(delta) {
        //https://labs.phaser.io/edit.html?src=src\input\gamepad\gamepad%20debug.js
        this.gamepad = this.input.gamepad.gamepads[0];

        if (this.gamepad) {
            this.player0.Run(Math.round(this.gamepad.axes[0].value), delta);

            if (this.gamepad.axes[1].value < -0.5) { this.player0.Jump(); }
            if (this.gamepad.buttons[6].value > 0.5) { this.player0.Attack(); }
            if (this.gamepad.buttons[6].value < 0.5) { this.player0.EnableAttack(); }
        } else {
            //P0
            let cursors0 = this.input.keyboard.addKeys({
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

            var keyObj = this.input.keyboard.addKey('E'); // Get key object

            if (cursors0.up.isDown) {
                this.player0.Jump();
            }

            if (keyObj.isDown) {
                this.player0.Attack();
            }

            if (keyObj.isUp) {
                this.player0.EnableAttack();
            }

            if (cursors0.left.isDown) {
                this.player0.Run(-1, delta);
            } else if (cursors0.right.isDown) {
                this.player0.Run(1, delta);
            } else {
                this.player0.Run(0, delta);
            }
        }

        switch (gameMode) {
            case 1:
                if (this.gamepad) {
                    this.player1.Run(Math.round(this.gamepad.axes[2].value), delta);
                    if (this.gamepad.axes[3].value < -0.5) { this.player1.Jump(); }
                    if (this.gamepad.buttons[7].value > 0.5) { this.player1.Attack(); }
                    if (this.gamepad.buttons[7].value < 0.5) { this.player1.EnableAttack(); }

                } else {
                    //P1
                    let cursors1 = this.input.keyboard.createCursorKeys();

                    if (cursors1.left.isDown) {
                        this.player1.Run(-1, delta);
                    } else if (cursors1.right.isDown) {
                        this.player1.Run(1, delta);
                    } else {
                        this.player1.Run(0, delta);
                    }

                    if (cursors1.up.isDown) {
                        this.player1.Jump();
                    }

                    this.input.on('pointerdown', function (pointer) {
                        this.player1.Attack(this.input.mousePointer.worldX, this.input.mousePointer.worldY);
                    }, this);

                    this.input.on('pointerup', function (pointer) {
                        this.player1.EnableAttack();
                    }, this);
                }
                break;

            case 2:

                break;

            default:
                break;
        }
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

    CreateStage() { }

    UpdateStage(time, delta) { }

    MeleeDamage(weapon, target) {
        target.Hurt(10);
        SendDamage(target.id, 10, this);
    }

    ProjectileDamage(target, projectile) {
        target.Hurt(100);
        projectile.destroy();
        SendDamage(target.id, 100, this);
    }

    ProjectileHitsWall(projectile, wall) {
        if (wall.index != -1) {
            projectile.destroy();
        }
    }

    update(time, delta) {
        //console.log(1000/delta);//Muestra fps

        this.entities.forEach(element => element.Update(time, delta));
        this.CheckInputs(delta);

        this.UpdateStage(time, delta);

        switch (gameMode) {
            case 0:
                break;
            case 1:
                if (!this.fading && this.swordPlayer && !this.camera.worldView.contains(this.swordPlayer.x, this.swordPlayer.y)) {
                    this.camera1.visible = true;
                } else { this.camera1.visible = false; }
                break;
            case 2:
                break;
            default:
                break;
        }

        checkServer();
    }

    LoadScene(key) {
        if (!this.fading) {
            this.player0.body.setVelocityX(0);
            if (gameMode != 2) { this.player1.body.setVelocityX(0); }
            this.fading = true;
            this.camera.fadeOut(500);
            switch (gameMode) {
                case 0:

                    break;
                case 1:
                    this.camera1.fadeOut(500);
                    break;
                case 2:

                    break;
                default:
                    break;
            }
            p0Health = this.player0.health;
            p1Health = this.player1.health;
            this.entities = [];

            this.camera.once('camerafadeoutcomplete', () => {
                this.scene.start(key);
            });
        }
    }

    DrawMessages() {
        const cloneMessages = [...this.messages];

        for (let newMg of chats) {
            //If the message is in the current scene
            if (newMg.scene == (this.sceneIdx + levelX.toString() + levelY.toString())) {
                let exists = false;
                for (const oldMg of cloneMessages) {
                    if (newMg.playerNick == oldMg.player) {
                        oldMg.x = newMg.x;
                        oldMg.y = newMg.y;
                        oldMg.value = newMg.value;
                        oldMg.date = newMg.date;
                        oldMg.setFrame(newMg.value);

                        exists = true;
                    }
                }

                if (!exists) {
                    let newMessage = new Message(this, newMg.x, newMg.y, newMg.playerNick, newMg.value);
                    this.messages.push(newMessage);
                }
            }
        }
    }

    DamageEntity(id, amount) {
        if (id > 1) {
            for (let e of this.entities) {
                if (e.id == id) {
                    e.Hurt(amount);
                    break;
                }
            }
        }
    }
}