class Guardian extends Enemy {
    constructor(scene, x, y, guardianKey) {
        super(scene, x, y, guardianKey)

        this.body.setSize(29, 31);
        this.body.offset.x = 54;
        this.body.offset.y = 59;

        {
            this.scene.anims.create({
                key: 'guardianWakeUp',
                frames: this.scene.anims.generateFrameNumbers(guardianKey, { start: 0, end: 1 }),
                frameRate: 3,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'guardianMove',
                frames: this.scene.anims.generateFrameNumbers(guardianKey, { start: 5, end: 16 }),
                frameRate: 9,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'guardianIdle',
                frames: this.scene.anims.generateFrameNumbers(guardianKey, { start: 2, end: 4 }),
                frameRate: 3,
                repeat: -1
            });

            this.scene.anims.create({
                key: 'guardianDie',
                frames: this.scene.anims.generateFrameNumbers(guardianKey, { start: 26, end: 29 }),
                frameRate: 8,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'guardianPreparingAttack',
                frames: this.scene.anims.generateFrameNumbers(guardianKey, { start: 17, end: 21 }),
                frameRate: 9,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'guardianAtack',
                frames: this.scene.anims.generateFrameNumbers(guardianKey, { start: 22, end: 25 }),
                frameRate: 12,
                repeat: 0
            });


        }
        this.awake = false;

        this.health = 500;
        this.canMove = false;
        this.attacking = false;
        this.canAttack = false;
        this.wait = 2000;
        this.timer = null;
        this.speed = 70;

        this.range = 50;
        this.rangeX = 300;
        this.rangeY = 50;



    }

    WakeUp() {



        this.awake = true;
        this.anims.play('guardianWakeUp', true);

        this.once('animationcomplete', () => {
            this.canMove = true;
            this.scene.time.delayedCall(this.wait, function () {
                this.canAttack = true;
            }, [], this);
        });


    }



    Die() {


        this.body.setVelocityX(0);
        this.awake = false;
        this.anims.play('guardianDie', true);
        this.canMove = false;
        this.body.enable = false;
        this.canAttack = false;
    }



    Update() {


        if (this.scene && this.canMove) {

            if (this.body.blocked.left || this.body.blocked.right) { this.body.setVelocityY(0); }

            if (((Math.abs(this.scene.bowPlayer.x - this.x) > this.rangeX) && (Math.abs(this.scene.swordPlayer.x - this.x) > this.rangeX)) || ((Math.abs(this.scene.bowPlayer.y - this.y) > this.rangeY) && (Math.abs(this.scene.swordPlayer.y - this.y) > this.rangeY))) {
                this.anims.play('guardianIdle', true);
                this.body.setVelocityX(0);
            } else {

                if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x)) {



                    if ((Math.abs(this.scene.bowPlayer.x - this.x) > this.range) || (Math.abs(this.scene.bowPlayer.y - this.y) > this.range)) {
                        if (this.scene.bowPlayer.x < this.x) {
                            this.body.setVelocityX(-this.speed);
                            this.flipX = false;
                            this.anims.play('guardianMove', true);

                        } else {
                            this.body.setVelocityX(this.speed);
                            this.flipX = true;
                            this.anims.play('guardianMove', true);
                        }
                    } else {

                        if (this.scene.bowPlayer.x < this.x) {
                            this.flipX = false;
                        } else {
                            this.flipX = true;
                        }

                        if (this.canAttack) {
                            this.Attack();
                        }

                    }
                } else {


                    if ((Math.abs(this.scene.swordPlayer.x - this.x) > this.range) || (Math.abs(this.scene.swordPlayer.y - this.y) > this.range)) {
                        if (this.scene.swordPlayer.x < this.x) {
                            this.body.setVelocityX(-this.speed);
                            this.flipX = false;
                            this.anims.play('guardianMove', true);


                        } else {
                            this.body.setVelocityX(this.speed);
                            this.flipX = true;
                            this.anims.play('guardianMove', true);

                        }

                    } else {

                        if (this.scene.swordPlayer.x < this.x) {
                            this.flipX = false;
                        } else {
                            this.flipX = true;
                        }

                        if (this.canAttack) {
                            this.Attack();
                        }

                    }
                }
            }
        }

    }

    Attack() {

        this.canMove = false;
        this.canAttack = false;

        this.body.setVelocityY(0);










        this.anims.play('guardianPreparingAttack', true);
        this.attacking = true;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        this.once('animationcomplete', () => {
            if (this.health > 0) {

                let offset = 0;
                (this.flipX) ? offset = 22 : offset = -22;



                this.hitBox = this.scene.physics.add.image(this.x + offset, this.y + 32, null);
                this.hitBox.setSize(50, 15);
                this.hitBox.visible = false;
                this.hitBox.body.setAllowGravity(false);

                this.hitBox.body.enable = true;
                this.scene.physics.add.overlap(this.hitBox, this.scene.players, this.scene.MeleeDamage, null, this.scene);

                this.anims.play('guardianAtack', true);




                this.once('animationcomplete', () => {
                    this.hitBox.destroy();
                    this.canMove = true;


                    this.scene.time.delayedCall(this.wait, function () {
                        this.canAttack = true;
                    }, [], this);

                });
            }

        });



    };

    CheckAttacking() { return this.attacking; }
}