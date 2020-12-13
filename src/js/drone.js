class Drone extends Enemy {
    constructor(scene, x, y, droneKey) {
        super(scene, x, y, droneKey);

        {
            this.scene.anims.create({
                key: 'droneWakeUp',
                frames: this.scene.anims.generateFrameNumbers(droneKey, { start: 0, end: 1 }),
                frameRate: 2,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'idleDrone',
                frames: this.scene.anims.generateFrameNumbers(droneKey, { start: 1, end: 1 }),
                frameRate: 1,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'flyLeft',
                frames: this.scene.anims.generateFrameNumbers(droneKey, { start: 1, end: 4 }),
                frameRate: 4,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'explosionD',
                frames: this.scene.anims.generateFrameNumbers(droneKey, { start: 5, end: 8 }),
                frameRate: 6,
                repeat: 0
            });
        }

        this.health = 10;
        this.canMove = false;
        this.attacking = false;
        this.canAttack = false;
        this.wait = 400;
        this.timer = null;
        this.speed = 90;
        this.range = 10;

        this.primaryTarget = this.scene.swordPlayer;
        this.secondaryTarget = this.scene.bowPlayer;

    }

    WakeUp() {
        this.awake = true;
        this.body.allowGravity = false;
        this.anims.play('droneWakeUp', true);

        this.once('animationcomplete', () => {
            this.anims.play('flyLeft', true);
            this.canMove = true;
            this.canAttack = true;
        });
    }

    Die() {

        this.canMove = false;
        this.canAttack = false;
        this.body.setVelocityX(0);


        if (this.attacking) {
            let index = this.scene.entities.indexOf(this);
            if (index > -1) {
                this.scene.entities.splice(index, 1);
            }

            this.destroy();

        } else {

            this.anims.play('explosionD', true);

            this.once('animationcomplete', () => {

                let index = this.scene.entities.indexOf(this);
                if (index > -1) {
                    this.scene.entities.splice(index, 1);
                }

                this.scene.time.delayedCall(10, this.destroy, [], this);
            });
        }
    }

    Update() {
        if (this.scene && this.canMove) {

            //if (this.body.blocked.left || this.body.blocked.right) { this.body.setVelocityY(-100); }

            if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x)) {

                if (Math.abs(this.scene.bowPlayer.x - this.x) > this.range) {
                    if (this.scene.bowPlayer.x < this.x) {
                        this.body.setVelocityX(-this.speed);
                        this.flipX = false;
                        this.anims.play('flyLeft', true);
                        
                    } else {
                        this.body.setVelocityX(this.speed);
                        this.flipX = true;
                        this.anims.play('flyLeft', true);
                        
                    }
                } else {

                    if (this.scene.bowPlayer.x < this.x) {
                        this.flipX = false;
                    } else {
                        this.flipX = true;
                    }

                    if (this.canAttack) {
                        this.Attack();

                    } else {
                        this.anims.play('idleDrone', true);
                    }
                }
            } else {
                if (Math.abs(this.scene.swordPlayer.x - this.x) > this.range) {
                    if (this.scene.swordPlayer.x < this.x) {
                        this.body.setVelocityX(-this.speed);
                        this.flipX = false;
                        this.anims.play('flyLeft', true);

                    } else {
                        this.body.setVelocityX(this.speed);
                        this.flipX = true;
                        this.anims.play('flyLeft', true);

                    }

                } else {

                    if (this.scene.swordPlayer.x < this.x) {
                        this.flipX = false;
                    } else {
                        this.flipX = true;
                    }

                    if (this.canAttack) {
                        this.Attack();

                    } else {
                        this.anims.play('idleDrone', true);
                    }
                }
            }

            if (this.health<1 || ((Math.abs(this.scene.swordPlayer.x - this.x) > 400) && (Math.abs(this.scene.bowPlayer.x - this.x) > 400))) {
                this.Die();
            }
        }

    }

    Attack() {
        //this.hitBox.body.enable = true;
        this.canMove = false;
        this.canAttack = false;
        this.attacking = true;
        //this.setTintFill(0xff1010);

        if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x)) {

            this.shotDown = new Shot(this.scene, this.x, this.y, true, this.flipX, this.secondaryTarget.x, this.secondaryTarget.y);
            this.shotDown.shooting(this.secondaryTarget.x, this.secondaryTarget.y);


        } else {
            this.shotDown = new Shot(this.scene, this.x, this.y, true, this.flipX, this.primaryTarget.x, this.primaryTarget.y);
            this.shotDown.shooting(this.primaryTarget.x, this.primaryTarget.y);

        }


        this.scene.time.delayedCall(1500, function () {
            this.canAttack = true; this.canMove = true; this.isHurt = false; this.attacking = false;

        }, [], this);
    }
}

class Shot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, dir, droneDir, targetx, targety) {
        super(scene, x, y, "shot");

        this.speed = 500;
        this.tx = targetx;
        this.ty = targety;

        this.destroyCounter = 0;

        this.scene = scene;
        scene.add.existing(this);
        scene.enemyProjectiles.add(this);
        this.body.setAllowGravity(false);

        this.scene.anims.create({
            key: 'droneShot',
            frames: this.scene.anims.generateFrameNumbers('droneShotKey', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.play('droneShot', true);

        this.body.setSize(6, 6, true);
        if (dir) {
            this.body.velocity.x = this.speed;
        } else {
            this.body.velocity.x = -this.speed;
        }

        if (droneDir) { this.x += 32; } else { this.x -= 32; }

        this.flipX = dir;

        this.setDepth(3);
    }

    shooting() {
        this.body.velocity.x = (this.tx - this.x) * 3;
        this.body.velocity.y = (this.ty - this.y) * 2;

        this.timer = this.scene.time.delayedCall(650, this.destroy, [], this);
    }


}