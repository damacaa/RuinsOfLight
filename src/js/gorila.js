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
        }

        this.health = 10000;
        this.canMove = false;
        this.attacking = false;
        this.canAttack = false;
        this.wait = 4000;
    }

    WakeUp() {
        this.awake = true;
        this.anims.play('gorilaWakeUp', true);

        this.once('animationcomplete', () => {
            this.anims.play('idleLeft', true);
            this.canMove = true;
            this.canAttack = true;
        });
    }

    Die() {

        this.anims.play('gorilaSleep', true);
        this.canMove = false;

        this.once('animationcomplete', () => {
            this.destroy();
        });
    }

    Update() {
        if (this.canMove) {

            if (Math.abs(this.scene.swordPlayer.x - this.x) > 100) {

                if (Math.abs(this.scene.bowPlayer.x - this.x) > 100) {
                    if (this.scene.bowPlayer.x < this.x) {
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

                    if (this.scene.bowPlayer.x < this.x) {
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

                if (this.scene.swordPlayer.x < this.x) {
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

        this.anims.play('smash', true);

        this.once('animationcomplete', () => {
            this.fireballLeft = new FireBall(this.scene, this.x, this.y + 112, true, this.flipX);
            this.fireballRight = new FireBall(this.scene, this.x, this.y + 112, false,this.flipX);
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
        scene.projectiles.add(this);
        this.body.setAllowGravity(false);



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

        if(gorilaDir){this.x += 32;}else{this.x -= 32;}

        

        this.flipX = dir;
    }

    update() {

        //this.body.velocity.x *= 0.99;

        /*if (this.destroyCounter++ > 100) {
            this.destroy();
        }*/
    }
}