class Drone extends Enemy {
    constructor(scene, x, y) {
        let droneKey = 'drone';

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
        this.wait = 2000;
        this.timer = null;
        this.speed = 90;
        this.range = 100;

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

        this.anims.play('explosionD', true);

        this.once('animationcomplete', () => {

            let index = this.scene.entities.indexOf(this);
            if (index > -1) {
                this.scene.entities.splice(index, 1);
            }
            this.scene.time.delayedCall(10, this.destroy, [], this);
        });
    }

    Update() {
        if (this.scene && this.canMove) {

            if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x)) {
                this.primaryTarget = this.scene.bowPlayer;
                this.secondaryTarget = this.scene.swordPlayer;
            } else {
                this.primaryTarget = this.scene.swordPlayer;
                this.secondaryTarget = this.scene.bowPlayer;
            }

            this.body.setVelocityY(Math.abs(this.primaryTarget.y - this.y) - Math.abs(this.primaryTarget.x - this.x));

            if (this.body.blocked.left || this.body.blocked.right) { this.body.setVelocityY(100); }


            if (Math.abs(this.primaryTarget.x - this.x) > this.range) {
                if (this.primaryTarget.x - 10 < this.x) {
                    this.body.setVelocityX(-this.speed);
                    this.flipX = false;
                    this.anims.play('flyLeft', true);

                } else if (this.primaryTarget.x + 10 > this.x) {
                    this.body.setVelocityX(this.speed);
                    this.flipX = true;
                    this.anims.play('flyLeft', true);
                }
            } else {

                if (this.primaryTarget.x < this.x) {
                    this.flipX = false;
                } else {
                    this.flipX = true;
                }

                if (this.canAttack && this.scene.camera.worldView.contains(this.x, this.y)) {
                    this.Attack();

                } else {
                    this.anims.play('idleDrone', true);
                }
            }

            if ((Math.abs(this.primaryTarget.x - this.x) > this.dieDistance)) {
                this.Die();
            }
        }

    }

    Attack() {
        this.canMove = false;
        //this.body.setVelocityX(0);
        //this.body.setVelocityY(0);
        this.canAttack = false;
        this.attacking = true;

        this.shotDown = new Shot(this.scene, this.x, this.y, this.flipX, this.primaryTarget.x, this.primaryTarget.y);
        this.scene.sound.play("effectDrone");

        this.scene.time.delayedCall(this.wait, function () {
            this.canAttack = true; this.canMove = true; this.attacking = false;
        }, [], this);
    }
}

class Shot extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, droneDir, targetx, targety) {
        super(scene, x, y, "shot");

        this.speed = 200;

        this.scene = scene;
        scene.add.existing(this);
        scene.enemyProjectiles.add(this);
        this.body.setAllowGravity(false);
        this.body.setSize(6, 6, true);

        this.scene.anims.create({
            key: 'droneShot',
            frames: this.scene.anims.generateFrameNumbers('droneShotKey', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        this.anims.play('droneShot', true);

        if (droneDir) { this.x += 16; } else { this.x -= 16; }

        /*scene.tweens.add({
            targets: this,
            duration: 500,
            angle: 360,
            ease: 'Quad.easeInOut',
            repeat: -1,
            yoyo: false
        });*/

        this.setDepth(3);

        this.body.velocity.x = (targetx - this.x) / Math.abs(targetx - this.x) * this.speed;
        this.body.velocity.y = (targety - this.y) / Math.abs(targety - this.y) * this.speed;

        this.timer = this.scene.time.delayedCall(2000, this.destroy, [], this);
    }
}