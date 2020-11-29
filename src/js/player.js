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
            showOnStart: true
        });

        scene.anims.create({
            key: 'jumpRight' + swordKey,
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 35, end: 36 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'fallRight' + swordKey,
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 37, end: 38 }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: 'attack1' + swordKey,
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 20, end: 24 }),
            frameRate: 10,
            repeat: 0
        });


        scene.anims.create({
            key: 'attack2' + swordKey,
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 25, end: 28 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'attack3' + swordKey,
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 29, end: 32 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'fallingAttackRight',
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 43, end: 46 }),
            frameRate: 12,
            repeat: 0
        });

        scene.anims.create({
            key: 'explosion',
            frames: scene.anims.generateFrameNumbers(swordKey, { start: 33, end: 34 }),
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
        this.canAttack = true;
    }

    CheckAttacking() {
        //console.log("Golpe?");
        return this.fallingAttack || this.attacking;
    }

    Run(dir, delta) {

        if (this.canMove && !this.attacking) { this.body.setVelocityX(dir * this.speed); }

        if (!this.attacking) {


            if (dir == 0) {

                if (this.body.onFloor()) {
                    this.anims.play('idleRight' + this.name, true);
                } else {
                    if (this.body.velocity.y < 0) {
                        this.anims.play('jumpRight' + this.name, true);
                    } else {
                        this.anims.play('fallRight' + this.name, true);
                    }
                }

            } else {

                if (dir == -1) {
                    //if (this.goingRight) { this.x -= 16; }

                    this.goingRight = false;
                    this.flipX = true;



                    this.ResetHitbox();
                }
                else if (dir == 1) {
                    //if (!this.goingRight) { this.x += 16; }
                    this.goingRight = true;
                    this.flipX = false;

                    this.ResetHitbox();
                }

                if (this.body.onFloor()) {
                    this.anims.play('right' + this.name, true);
                } else {
                    if (this.body.velocity.y < 0) {
                        this.anims.play('jumpRight' + this.name, true);
                    } else {
                        this.anims.play('fallRight' + this.name, true);
                    }
                }
            }


        } else {
            if (this.body.onFloor() && this.fallingAttack) {

                this.fallingAttack = false;
                this.scene.cameras.main.shake(500, .01);
                this.anims.play('explosion', true); //Sustituir por animacion de impacto contra el suelo

                this.once('animationcomplete', () => {
                    this.attacking = false;
                    this.ResetHitbox();
                });

            }
        }
    }

    Jump() {
        if (!this.attacking && this.body.onFloor()) {
            this.body.setVelocityY(-450);
        }
    }

    SetWeapon(id) {
        this.weapon = id;
        switch (id) {
            case 0:
                this.name = this.noWeaponKey;
                break;
            case 1:
                this.name = this.swordKey;
                break;
            case 2:
                this.name = '';
                break;
            default:
                this.name = '';
        }
    }

    Attack() {

        if (this.canAttack) {
            console.log("Ataca");
            this.SetWeapon(1);
            this.canAttack = false;

            //this. scene.anims.Attack(){ }


            switch (this.weapon) {
                case 1:
                    //Espada
                    this.AttackHitbox();
                    this.body.setVelocityX(0);
                    this.attacking = true;

                    if (this.body.blocked.down) {
                        this.anims.play('attack' + this.attackNumber + this.swordKey, true);

                        this.once('animationcomplete', () => {
                            if (this.attackNumber < 3) {
                                this.attackNumber++;
                            } else {
                                this.attackNumber = 1;
                            }
                            this.attacking = false;
                            this.ResetHitbox();
                        });

                    } else if (!this.fallingAttack) {
                        this.attacking = true;
                        this.fallingAttack = true;
                        this.body.setVelocityY(200);

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