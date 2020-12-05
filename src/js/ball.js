class Ball extends Enemy {
    constructor(scene, x, y, ballKey) {
        super(scene, x, y, ballKey);
        

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
                key: 'ballAtack',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 10, end: 13 }),
                frameRate: 4,
                repeat: 0
            });

            this.scene.anims.create({
                key: 'explosionB',
                frames: this.scene.anims.generateFrameNumbers(ballKey, { start: 14, end: 17}),
                frameRate: 4,
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
        this.anims.play('ballWakeUp', true);

        this.once('animationcomplete', () => {
            this.anims.play('explosionB', true);
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

        this.anims.play('explosionB', true);
        this.canMove = false;

        this.once('animationcomplete', () => {
            this.destroy();
        });
    }

    Update() {
        if((Math.abs(this.scene.swordPlayer.x - this.x) < 200) || (Math.abs(this.scene.bowPlayer.x - this.x)<200)){
            this.canMove=true;
        }
        
        if (this.canMove) {
                 
            if (Math.abs(this.scene.swordPlayer.x - this.x) > Math.abs(this.scene.bowPlayer.x - this.x) ) {
                

                if (Math.abs(this.scene.bowPlayer.x - this.x) > 24) {
                    if (this.scene.bowPlayer.x < this.x) {
                        this.body.setVelocityX(-40);
                        this.flipX = false;
                        this.anims.play('rollLeft', true);

                    } else {
                        this.body.setVelocityX(40);
                        this.flipX = true;
                        this.anims.play('rollLeft', true);

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
                        this.anims.play('idleBall', true);
                    }
                }


            } else {
                if (Math.abs(this.scene.swordPlayer.x - this.x) > 24) {
                    if (this.scene.swordPlayer.x < this.x) {
                        this.body.setVelocityX(-40);
                        this.flipX = false;
                        this.anims.play('rollLeft', true);

                    } else {
                        this.body.setVelocityX(40);
                        this.flipX = true;
                        this.anims.play('rollLeft', true);

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
                        this.anims.play('idleBall', true);
                    }
                }
            }
        }

        if((Math.abs(this.scene.swordPlayer.x - this.x) > 400) && (Math.abs(this.scene.bowPlayer.x - this.x)>400)){
            this.Sleep();
        }

        
    }

    Attack() {
        
        this.canMove = false;
       
        if (Math.abs(this.scene.swordPlayer.x - this.x) <= 24 || Math.abs(this.scene.bowPlayer.x - this.x)<=24) {

            this.anims.play('ballAtack', true);
            this.attacking = true;
             
            this.once('animationcomplete', () => {
                
                this.attacking = false;

                if (this.health > 0) {
                    this.canMove = true;
                }
            });

        }

        this.scene.time.delayedCall(this.wait, function () { this.canAttack = true; }, [], this);
    }

    CheckAttacking() { return this.attacking; }

}
