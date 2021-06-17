class Ball extends Enemy {
    constructor(scene, x, y) {
        let ballKey = 'ball';

        super(scene, x, y, ballKey);
        this.body.setSize(25, 25);
        this.body.offset.x = 19;
        this.body.offset.y = 19;

        {
            this.scene.anims.create({
                key: 'ballWakeUp',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 0, end: 1 }),
                frameRate: 2,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'ballSleep',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 1, end: 0 }),
                frameRate: 2,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'idleBall',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 1, end: 1 }),
                frameRate: 1,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'rollLeft',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 2, end: 9 }),
                frameRate: 4,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'ballAttack',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 10, end: 13 }),
                frameRate: 5,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'explosionB',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 14, end: 17 }),
                frameRate: 10,
                repeat: 0
            });
        }

        this.health = 10;
        this.canMove = false;
        this.attacking = false;
        this.canAttack = false;
        this.wait = 200;
        this.timer = null;
        this.speed = 300;
        this.body.setBounce(0.1);
        this.range = 50;

    }

    WakeUp() {
        this.awake = true;
        this.anims.play('ballWakeUp', true);

        this.once('animationcomplete', () => {
            this.canMove = true;
            this.canAttack = true;
        });
    }

    Sleep() {
        this.awake = false;
        this.anims.play('ballSleep', true);
        this.canMove = false;
        this.canAttack = false;
        this.body.setVelocityX(0);
    }

    Die() {

        this.canMove = false;
        this.body.setVelocityX(0);


        if (this.attacking) {
            let index = this.scene.entities.indexOf(this);
            if (index > -1) {
                this.scene.entities.splice(index, 1);
            }
            this.destroy();
        } else {

            this.anims.play('explosionB', true);

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
            if (this.body.blocked.left || this.body.blocked.right) { this.body.setVelocityY(-100); }

            if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x)) {
                this.primaryTarget = this.scene.bowPlayer;
                this.secondaryTarget = this.scene.swordPlayer;
            } else {
                this.primaryTarget = this.scene.swordPlayer;
                this.secondaryTarget = this.scene.bowPlayer;
            }

            if (Math.abs(this.primaryTarget.x - this.x) > this.range) {
                if (this.primaryTarget.x < this.x) {
                    this.body.setVelocityX(-this.speed);
                    this.flipX = false;
                    this.anims.play('rollLeft', true);
                } else {
                    this.body.setVelocityX(this.speed);
                    this.flipX = true;
                    this.anims.play('rollLeft', true);
                }
            } else {

                if (this.primaryTarget.x < this.x) {
                    this.flipX = false;
                } else {
                    this.flipX = true;
                }

                if (this.canAttack) {
                    this.Attack();
                } else {
                    this.anims.play('idleBall', true);
                }
            }

            if ((Math.abs(this.primaryTarget.x - this.x) > this.dieDistance)) {
                this.Die();
            }
        }

    }

    Attack() {
        this.canMove = false;
        this.canAttack = false;

        this.body.setVelocityY(-300);


        this.timer = this.scene.time.delayedCall(this.wait, startAttack, [null], this);


        function startAttack() {

            if (this.health > 0) {
                this.hitBox = this.scene.physics.add.image(this.x, this.y, null);
                this.hitBox.setCircle(28, -15, -6);
                this.hitBox.visible = false;
                this.hitBox.body.setAllowGravity(false);
                this.hitBox.body.enable = true;
                this.scene.physics.add.overlap(this.hitBox, this.scene.players, this.scene.MeleeDamage, null, this.scene);
                
                this.scene.sound.play("effectBall");
                this.anims.play('ballAttack', true);
                this.attacking = true;
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
                this.body.setAllowGravity(false);
                this.body.enable = false;

                this.once('animationcomplete', () => {
                    this.hitBox.destroy();
                    this.Die();
                });
            }
        }

    }

    CheckAttacking() { return this.attacking; }

}
