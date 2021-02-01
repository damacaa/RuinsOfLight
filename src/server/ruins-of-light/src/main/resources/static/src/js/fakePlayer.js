class FakePlayer extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, noWeaponKey, swordKey, bowKey, health) {
        super(scene, x, y, noWeaponKey);
        this.scene = scene;
        this.health = health;
        this.noWeaponKey = noWeaponKey;
        this.swordKey = swordKey;
        this.bowKey = bowKey;
        this.scene.add.existing(this);
        this.scene.entities.push(this);

        {
            scene.anims.create({
                key: 'right' + noWeaponKey,
                frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 0, end: 7 }),
                frameRate: 10,
                repeat: -1
            });

            scene.anims.create({
                key: 'idleRight' + noWeaponKey,
                frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 8, end: 11 }),
                frameRate: 10,
                repeat: -1,
                showOnStart: true
            });

            scene.anims.create({
                key: 'jumpRight' + noWeaponKey,
                frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 24, end: 25 }),
                frameRate: 10,
                repeat: 0
            });

            scene.anims.create({
                key: 'fallRight' + noWeaponKey,
                frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 26, end: 27 }),
                frameRate: 10,
                repeat: 0
            });

            scene.anims.create({
                key: 'getHurt',
                frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 32, end: 32 }),
                frameRate: 10,
                repeat: 0
            });

            //Animaciones espada

            scene.anims.create({
                key: 'right' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });

            scene.anims.create({
                key: 'idleRight' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 6, end: 9 }),
                frameRate: 10,
                repeat: -1,
            });

            scene.anims.create({
                key: 'jumpRight' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 10, end: 11 }),
                frameRate: 10,
                repeat: 0
            });

            scene.anims.create({
                key: 'fallRight' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 12, end: 13 }),
                frameRate: 10,
                repeat: 0
            });

            scene.anims.create({
                key: 'attack1' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 14, end: 18 }),
                frameRate: 15,
                repeat: 0
            });


            scene.anims.create({
                key: 'attack2' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 19, end: 22 }),
                frameRate: 15,
                repeat: 0
            });

            scene.anims.create({
                key: 'attack3' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 23, end: 26 }),
                frameRate: 15,
                repeat: 0
            });

            scene.anims.create({
                key: 'fallingAttackRight' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 27, end: 30 }),
                frameRate: 15,
                repeat: 0
            });

            scene.anims.create({
                key: 'explosion' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 31, end: 34 }),
                frameRate: 10,
                repeat: 0
            });

            scene.anims.create({
                key: 'getHurt' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 35, end: 36 }),
                frameRate: 10,
                repeat: 0
            });



            //Animaciones arco

            scene.anims.create({
                key: 'right' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 0, end: 5 }),
                frameRate: 10,
                repeat: -1
            });

            scene.anims.create({
                key: 'idleRight' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 6, end: 9 }),
                frameRate: 10,
                repeat: -1,
            });

            scene.anims.create({
                key: 'attack1' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 10, end: 19 }),
                frameRate: 25,
                repeat: 0
            });

            scene.anims.create({
                key: 'attack2' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 20, end: 22 }),
                frameRate: 25,
                repeat: 0
            });

            scene.anims.create({
                key: 'jumpRight' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 23, end: 24 }),
                frameRate: 15,
                repeat: 0
            });

            scene.anims.create({
                key: 'fallRight' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 25, end: 26 }),
                frameRate: 15,
                repeat: 0
            });

            scene.anims.create({
                key: 'fallingAttackRight' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 27, end: 35 }),
                frameRate: 25,
                repeat: 0
            });

            scene.anims.create({
                key: 'fallingAttackRight2' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 36, end: 37 }),
                frameRate: 25,
                repeat: 0
            });

            scene.anims.create({
                key: 'getHurt' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 38, end: 39 }),
                frameRate: 10,
                repeat: 0
            });
        }

        this.name = noWeaponKey;
        this.onFloor = false;
        this.weapon = 0;
        this.setDepth(3);
        this.speed = 100;

        this.nextX = x;
        this.nextY = y;
        this.lastUpdate = 0;
        this.delay = 10;

        this.anims.play('right' + this.name)

        if (isOrange) { this.id = 1 } else { this.id = 0 };

        this.shining = false;
    }

    FakeUpdate(x, y, h, anim, prog, flipX, date) {
        this.nextX = x;
        this.nextY = y;
        this.health = h;
        ui.healthBar.Update();


        if (anim && this.anims.currentAnim.key && anim != this.anims.currentAnim.key) {
            this.anims.play(anim, true);
            this.anims.setProgress(prog);
        }
        this.flipX = flipX;

        /////////////////////////////////////
        let currentDate = new Date();
        currentDate = (currentDate.getHours() * 1000000) + (currentDate.getMinutes() * 10000) + (currentDate.getSeconds() * 100) + currentDate.getMilliseconds();



        this.delay = Math.max(1, currentDate - this.lastUpdate);
        this.speed = Math.min(0.75 / this.delay, 1);

        this.lastUpdate = date;
        /*

        this.delay = Math.max(1, currentDate - date);
        this.lastUpdate = date;

        this.speed = Math.min(30 / this.delay, 1);

        if (this.shining) { this.setTintFill(0xeeeeba); } else { this.clearTint(); }

        this.shining = !this.shining;*/

    }

    SetWeapon(id) {
        this.weapon = id;
        switch (id) {
            case 0:
                this.name = this.noWeaponKey;
                break;
            case 1:
                this.scene.swordPlayer = this;
                this.name = this.swordKey;
                break;
            case 2:
                this.scene.bowPlayer = this;
                this.name = this.bowKey;
                break;
            default:
                this.name = this.noWeaponKey;
        }
    }

    Hurt() {
        if (!this.isHurt) {
            if (this.health > 0) {
                if (!godMode) { this.health--; }
                this.scene.sound.play("effectHurt");
                ui.healthBar.Update();
            } else {
                this.scene.LoadScene('gameOver');
            }
        }
    }

    Attack(x, y) {
        (this.x < x) ? new FakeArrow(this.scene, x, y, 1, 0) : new FakeArrow(this.scene, x, y, -1, 0);
        this.scene.sound.play("effectBow");
    }

    Update(time, delta) {
        if (this.health < 0) {
            this.scene.LoadScene('gameOver');
        }

        this.x += this.speed * (this.nextX - this.x);
        this.y += this.speed * (this.nextY - this.y);

        /*this.x += this.speed * delta * 0.1 * Math.round(Math.min(Math.max((this.nextX - this.x), -1), 1));
        this.y += this.speed * delta * 0.1 * Math.round(Math.min(Math.max((this.nextY - this.y), -1), 1));*/

        if (Number.isNaN(this.x) || Number.isNaN(this.y)) {
            this.x = this.nextX;
            this.y = this.nextY;
        }
    }

    Run() { }
}

class FakeArrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, dirX, dirY) {
        super(scene, x, y, "arrow");
        this.speed = 1000;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setAllowGravity(false);

        this.body.setSize(4, 4);
        this.body.velocity.x = dirX * this.speed;
        this.body.velocity.y = dirY * this.speed;

        this.setOrigin(0.5, 0.7);

        this.scene.time.delayedCall(1000, function () {
            this.destroy();
        }, [], this);

        this.setDepth(3);
    }
}