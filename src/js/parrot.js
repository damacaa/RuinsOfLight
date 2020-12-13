class Parrot extends Enemy {
    constructor(scene, x, y, parrotKey) {
        super(scene, x, y, parrotKey);

        this.body.setSize(100, 70);
        this.body.offset.x = 78;
        this.body.offset.y = 109;

        this.scene.anims.create({
            key: 'parrotWakeUp',
            frames: this.scene.anims.generateFrameNumbers(parrotKey, { start: 0, end: 4 }),
            frameRate: 3,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'parrotSleep',
            frames: this.scene.anims.generateFrameNumbers(parrotKey, { start: 4, end: 0 }),
            frameRate: 3,
            repeat: 0
        });

        this.scene.anims.create({
            key: 'parrotIdle',
            frames: this.scene.anims.generateFrameNumbers(parrotKey, { start: 5, end: 7 }),
            frameRate: 4,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'parrotAttack',
            frames: this.scene.anims.generateFrameNumbers(parrotKey, { start: 8, end: 8 }),
            frameRate: 3,
            repeat: -1
        });

        this.health = 2000;
        this.wait = 1000;

        this.hitBox = this.scene.physics.add.image(this.x, this.y, null);
        this.hitBox.visible = false;
        this.hitBox.setSize(50, 30);
        this.hitBox.body.setAllowGravity(false);
        this.hitBox.body.enable = false;

        this.primaryTarget = this.scene.swordPlayer;
        this.secondaryTarget = this.scene.bowPlayer;
    }

    WakeUp() {
        this.awake = true;
        this.body.allowGravity = false;
        this.anims.play('parrotWakeUp', true);
        this.healthBar = new StatusBar(this.scene, this, 'GREAT PARROT GUARDIAN');


        this.scene.physics.add.overlap(this.hitBox, this.scene.players, this.scene.MeleeDamage, null, this.scene);

        this.once('animationcomplete', () => {
            this.scene.cameras.main.shake(750, .01);
            this.anims.play('parrotIdle', true);
            this.canMove = true;
            this.canAttack = false;
            this.body.setSize(200, 70);
            this.body.offset.x = 28;
            this.body.offset.y = 120;

            //this.body.velocity.y = -200;
            this.body.setAccelerationY(-500);
        });
    }

    Die() {
        this.scene.camera.flash(1000);
        this.awake = false;

        defeatedBosses++;

        this.body.setSize(110, 70);
        this.body.offset.x = 78;
        this.body.offset.y = 109;
        this.body.velocity.x = 0;
        this.body.allowGravity = true;
        this.flipX = false;


        this.anims.play('parrotIdle', true);
        //console.log("Hello");
        this.canMove = false;

        this.healthBar.Death();

        this.scene.sound.stopAll();
        this.scene.sound.play("music", { loop: true }, { volume: 2 });
        this.scene.sound.play("effectDeathGorila");

        /*this.once('animationcomplete', () => {
            //this.destroy();
        });*/
    }

    Update() {
        if (this.awake) {
            this.healthBar.UpdateBar();
        }

        if (this.scene) {

            if (this.awake) {
                this.hitBox.x = this.x;
                this.hitBox.y = this.y + 50;
                if (this.canMove) {
                    if (this.body.y < -20) {
                        this.body.y = -19;
                        this.body.setAccelerationY(0);
                        this.body.velocity.x = 0;
                        this.body.velocity.y = 0;
                        this.scene.time.delayedCall(this.wait, function () { this.canAttack = true; }, [], this);
                    }

                    if (this.primaryTarget.x - 250 > this.x) {
                        this.body.velocity.x = 100;
                        this.flipX = true;
                    } else if (this.primaryTarget.x + 250 < this.x) {
                        this.body.velocity.x = -100;
                        this.flipX = false;
                    } else if (this.canAttack) {
                        this.Attack();
                    } else {
                        this.body.velocity.x = 0;
                        if (this.primaryTarget.x > this.x) {
                            this.flipX = true;
                        } else {
                            this.flipX = false;
                        }
                    }
                }

                if (this.body.blocked.down && this.attacking) {
                    this.anims.play('parrotIdle', true);
                    this.hitBox.body.enable = false;
                    this.canMove = true;
                    this.attacking = false;
                    this.body.setAccelerationY(-500);
                    this.scene.cameras.main.shake(750, .01);
                }

            } else {
                if (this.body.blocked.down && this.body.enable) {
                    this.anims.play('parrotSleep', true);
                    this.once('animationcomplete', () => {
                        this.body.enable = false;
                    });
                }
            }
        }
    }

    Attack() {
        if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x)) {
            this.primaryTarget = this.scene.swordPlayer;
        } else {
            this.primaryTarget = this.scene.bowPlayer;
        }

        if (this.primaryTarget.x - 250 > this.x) {
            this.body.velocity.x = 100;
            this.flipX = true;
        } else if (this.primaryTarget.x + 250 < this.x) {
            this.body.velocity.x = -100;
            this.flipX = false;
        }

        this.anims.play('parrotAttack', true);
        this.hitBox.body.enable = true;
        this.canMove = false;
        this.canAttack = false;
        this.attacking = true;
        //this.setTintFill(0xff1010);
        this.body.velocity.x = (this.primaryTarget.x - this.x) * 3;
        this.body.velocity.y = (this.primaryTarget.y - this.y) * 2;

        this.scene.sound.play("effectParrot");


        /*this.scene.time.delayedCall(1500, function () {
            this.anims.play('parrotIdle', true);
            this.hitBox.body.enable = false;
            this.canMove = true; this.attacking = false;
            //this.clearTint(); 
            this.body.setAccelerationY(-500);
        }, [], this);*/
    }

    Flinch() {
        if (this.attacking) {
            this.anims.play('parrotIdle', true);
            this.hitBox.body.enable = false;
            this.canMove = true;
            this.attacking = false;
            this.body.setAccelerationY(-500);
            this.body.velocity.x *= -1;
            //this.canMove = true;
            this.attacking = false;
        }


    }
}