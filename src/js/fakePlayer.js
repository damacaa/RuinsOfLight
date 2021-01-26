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
                repeat: 0
            });

            scene.anims.create({
                key: 'idleRight' + noWeaponKey,
                frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 8, end: 11 }),
                frameRate: 10,
                repeat: 0,
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
                repeat: 0
            });

            scene.anims.create({
                key: 'idleRight' + swordKey,
                frames: scene.anims.generateFrameNumbers(swordKey, { start: 6, end: 9 }),
                frameRate: 10,
                repeat: 0,
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
                repeat: 0
            });

            scene.anims.create({
                key: 'idleRight' + bowKey,
                frames: scene.anims.generateFrameNumbers(bowKey, { start: 6, end: 9 }),
                frameRate: 10,
                repeat: 0,
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
        this.speedX = 0;
        this.onFloor = false;
        this.weapon = 0;
        this.setDepth(3);
    }

    FakeUpdate(x, y, h, anim, prog, flipX) {
        this.x = x;
        this.y = y;
        this.health = h;
        ui.healthBar.Update();
        if (anim) { this.anims.play(anim, true); }
        this.flipX = flipX;
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

    Update() { }

    Run(){}

}
