//https://www.youtube.com/watch?v=jEaoeEdv7eU

class GreatGorila extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, gorilaKey) {
    super(scene, x, y, gorilaKey);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.enemies.add(this);

    this.body.setSize(100, 148);
    this.body.offset.x = 90;
    this.body.offset.y = 108;

    //this.body.setAllowDrag(true)
    //this.body.setDrag(1000, 0)
    //this.body.setFriction(  50, 0)


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
      frameRate: 3,
      repeat: 0
    });

    this.scene.anims.create({
      key: 'explosionG',
      frames: this.scene.anims.generateFrameNumbers(gorilaKey, { start: 14, end: 14 }),
      frameRate: 3,
      repeat: 0
    });

    this.health = 1000;
    this.canMove = false;
    this.attacking = false;
    this.canAttack = false;
    this.wait = 4000;

  }
  WakeUp() {
    this.anims.play('gorilaWakeUp', true);

    this.once('animationcomplete', () => {
      this.anims.play('idleLeft', true);
      this.canMove = true;
      this.canAttack = true;
    });

  }

  DealDamage(amount) {
    this.setTintFill(0xff1010);
    this.scene.time.delayedCall(25, function () { this.clearTint(); }, [], this);

    this.health -= amount;
    console.log("Ouch! " + this.health);

    if (this.health <= 0) {
      this.anims.play('gorilaSleep', true);
      this.canMove = false;

      this.once('animationcomplete', () => {
        //this.setActive(false);
        //this.  scene.physics.world.removeCollider(this);
        this.Die();
      });

    }
  }

  Die() {
    this.destroy();
  }

  Update() {
    if (this.canMove) {
      if (Math.abs(this.scene.player0.x - this.x) > 100) {
        if (this.scene.player0.x < this.x) {
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
        if (this.canAttack) {
          this.attacking = true;
          this.canAttack = false;
          this.canMove = false;

          this.anims.play('smash', true);

          this.once('animationcomplete', () => {
            this.fireball = new FireBall(this.scene, this.x, this.y+112, true);
            this.fireball = new FireBall(this.scene, this.x, this.y+112, false);
            this.attacking = true;
            this.anims.play('explosionG', true);
            this.scene.cameras.main.shake(750, .05);
            this.once('animationcomplete', () => {

              this.attacking = false;

              if (this.health > 0) {
                this.canMove = true;
              }
            });

          });

          this.scene.time.delayedCall(this.wait, function () { this.canAttack = true; }, [], this);

        } else {
          this.anims.play('idleLeft', true);
        }
      }
    }
  }

  CheckAttacking() { return this.attacking; }

}

class FireBall extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, dir) {
    super(scene, x, y, "hola");


    this.speed = 250;

    this.destroyCounter = 0;

    this.scene = scene;
    scene.add.existing(this);
    scene.projectiles.add(this);
    this.body.setAllowGravity(false);


    // set setSize
    this.setOrigin(0.5, 0.5);
    this.body.setSize(12, 12, true);


    this.scene.anims.create({
      key: 'gorilaProjectileEvolution',
      frames: this.scene.anims.generateFrameNumbers('gorilaProjectileKey', { start: 0, end: 2 }),
      frameRate: 3,
      repeat: 0
    });

    //this.play("gorilaProjectileEvolution");
    this.anims.play('gorilaProjectileEvolution', true);

    if (dir) {
      //this.x += 38;
      this.body.velocity.x = this.speed;
    } else {
      //this.x -= 38;
      this.body.velocity.x = -this.speed;
    }

this.flipX = dir;
  }

  update() {
    if (this.destroyCounter++ > 100) {
      this.destroy();
    }
  }
}