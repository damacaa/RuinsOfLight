//https://www.youtube.com/watch?v=jEaoeEdv7eU

class GreatGorila extends Enemy {
    constructor(scene, x, y, gorilaKey) {
        super(scene, x, y, gorilaKey);

        this.body.setSize(100, 148);
        this.body.offset.x = 90;
        this.body.offset.y = 108;

        {
            this.scene.anims.create({
                key: 'gorilaWakeUp',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 0, end: 4 }),
                frameRate: 3,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'gorilaSleep',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 4, end: 0 }),
                frameRate: 3,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'idleLeft',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 5, end: 6 }),
                frameRate: 2,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'walkLeft',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 7, end: 10 }),
                frameRate: 2,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'smash',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 11, end: 13 }),
                frameRate: 4,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'explosionG',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 14, end: 18 }),
                frameRate: 8,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'dead',
                frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 19, end: 27 }),
                frameRate: 4,
                repeat: 0
            });
        }

        
        this.health = 4000;
        this.wait = 4000;

        this.primaryTarget = this.scene.bowPlayer;
        this.secondaryTarget = this.scene.swordPlayer;

        this.body.enable = false;
    }

    WakeUp() {
        this.awake = true;
        this.anims.play('gorilaWakeUp', true);
        this.healthBar = new StatusBar(this.scene, this, 'GREAT GORILA GUARDIAN');
        this.setDepth(2);

        this.once('animationcomplete', () => {
            this.anims.play('idleLeft', true);
            this.canMove = true;
            this.canAttack = true;
            this.body.enable = true;
            this.Attack();
        });
    }

    Die() {
        this.scene.camera.flash(1000);
        defeatedBosses++;

        this.awake = false;
        this.anims.play('dead', true);
        this.canMove = false;
        this.body.enable = false;

        this.healthBar.Death();

        this.scene.sound.stopAll();
        this.scene.sound.play("music", { loop: true }, { volume: 2 });
        this.scene.sound.play("effectDeathGorila");

        /*this.once('animationcomplete', () => {
            this.destroy();
        });*/
    }

    Update() {
        if (this.awake) {
            this.healthBar.UpdateBar();
        }

        if (this.scene && this.canMove) {

            if (Math.abs(this.secondaryTarget.x - this.x) > 100) {

                if (Math.abs(this.primaryTarget.x - this.x) > 100) {
                    if (this.primaryTarget.x < this.x) {
                        this.body.setVelocityX(-20);
                        this.flipX = false;
                        this.anims.play('walkLeft', true);

                    } else {
                        this.body.setVelocityX(20);
                        this.flipX = true;
                        this.anims.play('walkLeft', true);

                    }
                } else {
                    this.body.setVelocityX(0);

                    if (this.primaryTarget.x < this.x) {
                        this.flipX = false;
                    } else {
                        this.flipX = true;
                    }

                    if (this.canAttack) {
                        this.Attack();
                    } else {
                        this.anims.play('idleLeft', true);
                    }
                }


            } else {
                this.body.setVelocityX(0);

                if (this.secondaryTarget.x < this.x) {
                    this.flipX = false;
                } else {
                    this.flipX = true;
                }

                if (this.canAttack) {
                    this.Attack();
                } else {
                    this.anims.play('idleLeft', true);
                }
            }
        }
    }

    Attack() {
        //this.attacking = true;
        this.canAttack = false;
        this.canMove = false;
        this.scene.sound.play("effectGorila");
        this.anims.play('smash', true);

        this.once('animationcomplete', () => {
            this.fireballLeft = new FireBall(this.scene, this.x, this.y + 112, true, this.flipX);
            this.fireballRight = new FireBall(this.scene, this.x, this.y + 112, false, this.flipX);
            //this.attacking = true;
            this.anims.play('explosionG', true);
            this.scene.cameras.main.shake(750, .01);
            this.once('animationcomplete', () => {

                this.attacking = false;

                if (this.health > 0) {
                    this.canMove = true;
                }
            });

        });

        this.scene.time.delayedCall(this.wait, function () { this.canAttack = true; }, [], this);
    }

    CheckAttacking() { return this.attacking; }

}


class FireBall extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, dir, gorilaDir) {
        super(scene, x, y, "hola");


        this.speed = 350;

        this.destroyCounter = 0;

        this.scene = scene;
        scene.add.existing(this);
        scene.enemyProjectiles.add(this);
        this.body.setAllowGravity(false);

        this.setDepth(3);

        // set setSize

        this.scene.anims.create({
            key: 'gorilaProjectileEvolution',
            frames: this.scene.anims.generateFrameNumbers('gorilaProjectileKey', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        //this.play("gorilaProjectileEvolution");
        this.anims.play('gorilaProjectileEvolution', true);

        this.body.setSize(32, 32, true);
        if (dir) {
            //this.x -= 38;
            this.body.velocity.x = this.speed;
            this.body.offset.x = 32;
        } else {
            //this.x -= 38;
            this.body.velocity.x = -this.speed;
            this.body.offset.x = 0;
        }

        if (gorilaDir) { this.x += 32; } else { this.x -= 32; }



        this.flipX = dir;
    }
}