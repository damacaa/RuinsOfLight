class Player extends Phaser.GameObjects.Sprite {


    constructor(scene, x, y, noWeaponKey, swordKey, bowKey, health) {
        super(scene, x, y, noWeaponKey);
        this.scene = scene;
        this.health = health;
        this.noWeaponKey = noWeaponKey;
        this.swordKey = swordKey;
        this.bowKey = bowKey;
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


        this.body.setSize(16, 32);
        this.body.offset.x = 32;
        this.body.offset.y = 32;
        this.hitBox;

        //this.body.setCollideWorldBounds(true);


        //this.scaleX = 2;
        //this.scaleY = 2;
        //this.displayWidth = 100;

        this.name = noWeaponKey;

        this.goingRight = true;
        this.attacking = false;
        this.speed = 200;//200
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

        this.setDepth(2);
        //player0.setBounce(0.2);
        //body.setCollideWorldBounds(true);

    }

    ResetHitbox() {
        this.attacking = false;
        this.fallingAttack = false;
        this.hitBox.body.enable = false;
    }

    AttackHitbox() {
        this.hitBox.body.enable = true;
        this.hitBox.x = (this.flipX) ? this.x - 20 : this.x + 20;
        this.hitBox.y = this.y + 16;
        this.hitBox.setSize(20, 10);
    }

    EnableAttack() {
        this.canAttack = this.canMove;
    }

    CheckAttacking() {
        //console.log("Golpe?");
        return this.fallingAttack || this.attacking;
    }

    Run(dir, delta) {
        if(this.attacking){console.log(this.attacking);}

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
                }
                else if (dir == 1) {
                    this.flipX = false;
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


        } else if (this.fallingAttack && this.weapon == 1) {
            this.hitBox.y = this.y + 16;

            if (this.body.onFloor()) {

                this.jumping = false;
                this.falling = false;
                this.fallingAttack = false;
                this.scene.cameras.main.shake(100, .01);
                this.anims.play('explosion' + this.name, true); //Sustituir por animacion de impacto contra el suelo

                this.once('animationcomplete', () => {
                    this.attacking = false;
                    this.fallingAttack = false;
                    this.hitBox.body.enable = false;
                });


            }
        }
    }

    Jump() {
        if (!this.attacking && this.body.blocked.down && this.canMove) {
            this.body.setVelocityY(-450);
        }
    }

    Hurt() {
        if (!this.isHurt) {
            this.anims.play('getHurt' + this.name, true);
            this.isHurt = true;
            this.canAttack = false;
            this.canMove = false;
            this.attacking = false;
            this.fallingAttack = false;

            if (this.health != 0) {
                this.health--;
                this.body.setVelocityY(-300);
                this.body.setVelocityX(0);

                this.fallingAttack = false;
                //this.hitBox.body.enable = false;

                this.attacking = false;
                this.fallingAttack = false;
                //this.hitBox.body.enable = false;
                this.scene.health.UpdateLifes();

                this.scene.time.delayedCall(1000, function () {
                    this.canAttack = true; this.canMove = true; this.isHurt = false;

                }, [], this);

            } else {
                this.scene.LoadScene('mainMenu');
            }

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

                this.hitBox = this.scene.physics.add.image(this.x, this.y, null);
                this.hitBox.visible = false;
                this.hitBox.setSize(10, 10);
                this.hitBox.body.setAllowGravity(false);
                this.scene.physics.add.overlap(this.hitBox, this.scene.enemies, this.scene.MeleeDamage, null, this.scene);

                break;
            case 2:
                this.scene.bowPlayer = this;
                this.name = this.bowKey;
                break;
            default:
                this.name = this.noWeaponKey;
        }
    }

    Attack(x, y) {

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


                            switch (this.attackNumber) {
                                case 1:
                                    break;
                                case 2:
                                    (this.flipX) ? this.body.setVelocityX(-500) : this.body.setVelocityX(500);
                                    this.scene.time.delayedCall(50, function () {
                                        this.body.setVelocityX(0)
                                    }, [], this);
                                    this.hitBox.x = (this.flipX) ? this.x - 50 : this.x + 50;

                                    break;
                                case 3:
                                    (this.flipX) ? this.body.setVelocityX(250) : this.body.setVelocityX(-250);
                                    this.scene.time.delayedCall(25, function () {
                                        this.body.setVelocityX(0)
                                    }, [], this);
                                    break;
                                default:
                            }

                            this.once('animationcomplete', () => {
                                if (this.combo && (this.attackNumber < 3)) {
                                    this.attackNumber++;
                                    this.canAttack = true;
                                    this.attacking = false;
                                    this.Attack();
                                } else {
                                    this.attackNumber = 1;
                                    this.attacking = false;
                                    this.attacking = false;
                                    this.fallingAttack = false;
                                    this.hitBox.body.enable = false;
                                }

                                this.combo = false;

                            });
                        } else { this.combo = true; }

                    } else if (!this.fallingAttack) {
                        this.attacking = true;
                        this.fallingAttack = true;
                        this.body.velocity.y += 500;

                        this.anims.play('fallingAttackRight' + this.name, true);

                    }
                    break;
                case 2:
                    //Arco
                    if (!this.attacking) {
                        this.body.setVelocityX(0);

                        if (this.body.blocked.down) {

                            this.attacking = true;
                            this.anims.play('attack1' + this.name, true);

                            /*this.scene.time.delayedCall(1000, function () {
                                this.attacking = false;

                                (!this.flipX) ? new Arrow(this.scene, this.x + 16, this.y + 16, 1, 0) : new Arrow(this.scene, this.x - 16, this.y + 16, -1, 0);
                            }, [], this);*/

                            this.once('animationcomplete', () => {
                                console.log("listo");
                                this.attacking = false;
                                this.anims.play('attack2' + this.name, true);
                                (!this.flipX) ? new Arrow(this.scene, this.x + 16, this.y + 16, 1, 0) : new Arrow(this.scene, this.x - 16, this.y + 16, -1, 0);
                            });

                            
                            

                            /*
                            if (!x || !y) {
    
                            }
                            else {
                                let dirX = x - this.x;
                                let dirY = y - 16 - this.y;
                                let sum = Math.abs(-dirX + dirY);
                                dirX /= sum;
                                dirY /= sum;
                            }*/

                        } else if (!this.fallingAttack) {
                            this.attacking = true;
                            this.fallingAttack = true;

                            this.anims.play('fallingAttackRight' + this.name, true);
                            //(!this.flipX) ? new Arrow(this.scene, this.x + 16, this.y + 16, 1, 0) : new Arrow(this.scene, this.x - 16, this.y + 16, -1, 0);
                            
                            this.once('animationcomplete', () => {
                                console.log("listo");
                                this.attacking = false;
                                this.fallingAttack = false;
                                this.anims.play('fallingAttackRight2' + this.name, true);

                                (!this.flipX) ? new Arrow(this.scene, this.x + 16, this.y + 16, 1, 0) : new Arrow(this.scene, this.x - 16, this.y + 16, -1, 0);
                            });
                        }
                    }
                    break;
            }
        }
    }
}

class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, dirX, dirY) {
        super(scene, x, y, "arrow");


        this.speed = 1000;

        this.destroyCounter = 0;

        this.scene = scene;
        scene.add.existing(this);
        scene.playerProjectiles.add(this);
        this.body.setAllowGravity(false);

        this.body.setSize(4, 4);
        this.body.velocity.x = dirX * this.speed;
        this.body.velocity.y = dirY * this.speed;

        //scene.graphics.lineBetween(x, y, x+(dirX*100), y+(dirY*100));

        this.setOrigin(0.5, 0.7);

        /*scene.tweens.add({
            targets: this,
            duration: 500,
            angle: 360,
            //ease: 'Quad.easeInOut',
            repeat: -1,
            yoyo: false
        });*/

        this.scene.time.delayedCall(1000, function () {
            this.destroy();

        }, [], this);
    }



}