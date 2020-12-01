class Player extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y, noWeaponKey, swordKey) {
        super(scene, x, y, noWeaponKey);
        this.scene = scene;
        this.noWeaponKey = noWeaponKey;
        this.swordKey = swordKey;
        this.config = config;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

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
            repeat: -1
        });

        scene.anims.create({
            key: 'fallRight' + noWeaponKey,
            frames: scene.anims.generateFrameNumbers(noWeaponKey, { start: 26, end: 27 }),
            frameRate: 10,
            repeat: -1
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
            //showOnStart: true
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
            key: 'fallingAttackRight',
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 27, end: 30 }),
            frameRate: 15,
            repeat: 0
        });

        scene.anims.create({
            key: 'explosion',
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 31, end: 34 }),
            frameRate: 10,
            repeat: 0
        });






        this.ResetHitbox();

        //this.body.setCollideWorldBounds(true);


        //this.scaleX = 2;
        //this.scaleY = 2;
        //this.displayWidth = 100;

        this.name = noWeaponKey;

        this.goingRight = true;
        this.attacking = false;
        this.speed = 200;
        this.weapon = 0;
        this.attackNumber = 1;
        this.fallingAttack = false;
        this.canAttack = true;
        this.canMove = true;
        this.isHurt = false;
        this.combo = false;

        this.jumping = false;
        this.falling = false;

        this.dealingDamage = false;
        //player0.setBounce(0.2);
        //body.setCollideWorldBounds(true);

    }

    ResetHitbox() {
        if (this.flipX) {
            this.body.setSize(16, 32);
            this.body.offset.x = 32;
            this.body.offset.y = 32;
        } else {
            this.body.setSize(16, 32);
            this.body.offset.x = 32;
            this.body.offset.y = 32;
        }
    }

    AttackHitbox() {
        if (this.flipX) {
            this.body.setSize(48, 32);
            this.body.offset.x = 0;
            this.body.offset.y = 32;
        } else {
            this.body.setSize(48, 32);
            this.body.offset.x = 32;
            this.body.offset.y = 32;
        }
    }

    EnableAttack() {
        this.canAttack = this.canMove;
    }

    CheckAttacking() {
        //console.log("Golpe?");
        return this.fallingAttack || this.attacking;
    }

    Run(dir, delta) {

        if (this.canMove && !this.attacking) { this.body.setVelocityX(dir * this.speed); }

        if (!this.attacking && !this.isHurt) {


            if (dir == 0) {
                //this.anims.play('idleRight' + this.name, true);

                if (this.body.onFloor()) {
                    this.anims.play('idleRight' + this.name, true);
                    this.falling = false;
                } else {
                    if (this.body.velocity.y < 0) {
                        if (!this.jumping) {
                            this.anims.play('jumpRight' + this.name, true);
                            this.jumping = true;
                        }


                    } else {
                        this.jumping = false;
                        if (!this.falling) {
                            this.anims.play('fallRight' + this.name, true);
                            this.falling = true;
                        }
                    }
                }

            } else {

                if (dir == -1) {
                    this.flipX = true;
                    this.ResetHitbox();
                }
                else if (dir == 1) {
                    this.flipX = false;
                    this.ResetHitbox();
                }

                if (this.body.onFloor()) {
                    this.anims.play('right' + this.name, true);
                    this.falling = false;
                } else {
                    if (this.body.velocity.y < 0) {
                        if (!this.jumping) {
                            this.anims.play('jumpRight' + this.name, true);
                            this.jumping = true;
                        }
                    } else {
                        this.jumping = false;
                        if (!this.falling) {
                            this.anims.play('fallRight' + this.name, true);
                            this.falling = true;
                        }
                    }
                }
            }


        } else {
            if (this.body.onFloor() && this.fallingAttack) {

                this.fallingAttack = false;
                this.scene.cameras.main.shake(100, .01);
                this.anims.play('explosion', true); //Sustituir por animacion de impacto contra el suelo

                this.once('animationcomplete', () => {
                    this.attacking = false;
                    this.ResetHitbox();
                });
            }
        }
    }

    Jump() {
        if (!this.attacking && this.body.onFloor() && this.canMove) {
            this.body.setVelocityY(-450);
        }
    }

    Hurt() {

        if (!this.isHurt) {
            this.anims.play('getHurt', true);
            this.isHurt = true;
            this.canAttack = false;
            this.canMove = false;
            this.attacking = false;
            this.fallingAttack = false;

            this.body.setVelocityY(-300);
            this.body.setVelocityX(0);

            this.scene.time.delayedCall(2000, function () { this.canAttack = true; this.canMove = true; this.isHurt = false; this.ResetHitbox(); }, [], this);
        }
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
                this.name = this.noWeaponKey;
                break;
            default:
                this.name = this.noWeaponKey; '';
        }
    }

    Attack() {

        if (this.canAttack) {
            this.canAttack = false;

            switch (this.weapon) {
                case 1:
                    //Espada


                    this.AttackHitbox();
                    this.body.setVelocityX(0);


                    if (this.body.blocked.down) {
                        //Ataque en el suelo
                        if (!this.attacking) {
                            this.anims.play('attack' + this.attackNumber + this.swordKey, true);
                            this.attacking = true;

                            this.once('animationcomplete', () => {
                                if (this.combo && (this.attackNumber < 3)) {
                                    this.attackNumber++;
                                    this.canAttack = true;
                                    this.attacking = false;
                                    this.Attack();
                                } else {
                                    this.attackNumber = 1;
                                    this.attacking = false;
                                    this.ResetHitbox();
                                }

                                //this.attackNumber = 1;




                                this.combo = false;

                            });
                        } else { this.combo = true; }

                    } else if (!this.fallingAttack) {
                        this.attacking = true;
                        this.fallingAttack = true;
                        this.body.velocity.y += 500;

                        this.AttackHitbox();

                        this.anims.play('fallingAttackRight', true);

                    }
                    break;
                case 2:
                    //Arco
                    break;
                default:
                //Puños?
            }
        }
    }
}