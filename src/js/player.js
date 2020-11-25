class Player extends Phaser.GameObjects.Sprite {
    constructor(config, noWeaponKey, swordKey) {
        super(config.scene, config.x, config.y, noWeaponKey);
        this.noWeaponKey = noWeaponKey;
        this.swordKey = swordKey;
        this.config = config;
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);

        config.scene.anims.create({
            key: 'right' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 0, end: 7 }),
            frameRate: 10,
            repeat: -1
        });

        config.scene.anims.create({
            key: 'idleRight' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 8, end: 11 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });

        config.scene.anims.create({
            key: 'left' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 12, end: 20 }),
            frameRate: 10,
            repeat: -1
        });

        config.scene.anims.create({
            key: 'idleLeft' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 20, end: 23 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });

        config.scene.anims.create({
            key: 'jumpRight' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 24, end: 25 }),
            frameRate: 10,
            repeat: -1
        });

        config.scene.anims.create({
            key: 'fallRight' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 26, end: 27 }),
            frameRate: 10,
            repeat: -1
        });

        config.scene.anims.create({
            key: 'jumpLeft' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 28, end: 29 }),
            frameRate: 10,
            repeat: -1
        });

        config.scene.anims.create({
            key: 'fallLeft' + noWeaponKey,
            frames: config.scene.anims.generateFrameNumbers(noWeaponKey, { start: 30, end: 31 }),
            frameRate: 10,
            repeat: -1
        });

        config.scene.anims.create({
            key: 'attack1' + swordKey,
            frames: config.scene.anims.generateFrameNumbers(swordKey, { start: 19, end: 22 }),
            frameRate: 10,
            repeat: 0
        });

        config.scene.anims.create({
            key: 'attack2' + swordKey,
            frames: config.scene.anims.generateFrameNumbers(swordKey, { start: 23, end: 27 }),
            frameRate: 10,
            repeat: 0
        });


        this.body.setSize(16, 32);
        this.body.offset.x = 16;
        this.body.offset.y = 32;

        //this.body.setCollideWorldBounds(true);


        //this.scaleX = 2;
        //this.scaleY = 2;
        //this.displayWidth = 100;

        this.goingRight = true;
        this.attcking = false;
        this.speed = 300;
        this.weapon = 0;
        this.attackNumber = 1;
        //player0.setBounce(0.2);
        //body.setCollideWorldBounds(true);
    }


    Run(dir, delta) {

        if (!this.attcking) {
            //this.body.setVelocityX(dir * this.speed);
            //console.log(delta);
            this.body.x += dir * this.speed * delta / 1000;

            if (dir == -1) {
                this.goingRight = false;
                if (this.body.touching.down) {
                    this.anims.play('left' + this.noWeaponKey, true);
                } else {
                    if (this.body.velocity.y < 0) {
                        this.anims.play('jumpLeft' + this.noWeaponKey, true);
                    } else {
                        this.anims.play('fallLeft' + this.noWeaponKey, true);
                    }
                }


            }
            else if (dir == 1) {
                this.goingRight = true;

                if (this.body.touching.down) {
                    this.anims.play('right' + this.noWeaponKey, true);
                } else {
                    if (this.body.velocity.y < 0) {
                        this.anims.play('jumpRight' + this.noWeaponKey, true);
                    } else {
                        this.anims.play('fallRight' + this.noWeaponKey, true);
                    }
                }
            }
            else {
                if (this.body.touching.down) {
                    if (this.goingRight) { this.anims.play('idleRight' + this.noWeaponKey, true); } else { this.anims.play('idleLeft' + this.noWeaponKey, true); }
                } else {
                    if (this.body.velocity.y < 0) {
                        if (this.goingRight) { this.anims.play('jumpRight' + this.noWeaponKey, true); } else { this.anims.play('jumpLeft' + this.noWeaponKey, true); }
                    } else {
                        if (this.goingRight) { this.anims.play('fallRight' + this.noWeaponKey, true); } else { this.anims.play('fallLeft' + this.noWeaponKey, true); }
                    }
                }
            }
        }
    }

    Jump() {
        this.body.setVelocityY(-400);
    }

    SetWeapon(id) {
        switch (id) {
            case 0:
                this.name = '';
                break;
            case 1:
                this.name = this.nameSword;
                break;
            case 2:
                this.name = '';
                break;
            default:
                this.name = '';
        }
    }

    Attack() {


        //this.config.scene.anims.Attack(){ }
        this.body.setVelocityX(0);
        this.attcking = true;

        if (this.body.touching.down) {
            this.anims.play('attack' + this.attackNumber + this.swordKey, true);

            this.once('animationcomplete', () => {
                console.log('animationcomplete')
                this.attackNumber = 1;
                this.attcking = false;
            });

        } else {
            this.body.setVelocityY(300);

            this.anims.play('attack2' + this.swordKey, true);

            this.once('animationcomplete', () => {
                console.log('animationcomplete')
                this.attackNumber = 1;
                this.attcking = false;
            });

        }

    }


}