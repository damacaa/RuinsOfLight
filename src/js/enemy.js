class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.enemies.add(this);

    this.scene.entities.push(this);

    //this.body.setAllowDrag(true)
    //this.body.setDrag(1000, 0)
    //this.body.setFriction(  50, 0)

    this.health = 1000;
    this.canMove;
    this.attacking;
    this.canAttack;
    this.wait = 2000;
    this.awake = false;
    this.speed=100;

    this.primaryTarget;
    this.secondaryTarget;

    this.setDepth(1);
  }

  WakeUp() {
    console.log("Empiezo a moverme");
    this.canMove = true;
    this.awake = true;

    this.scene.time.delayedCall(this.wait * 2, function () { this.canAttack = true; }, [], this);
  }

  Die() {
    this.canMove = false;
    this.canAttack = false;
    this.body.enable = false;

    console.log(this.scene.entities.length);

    const index = this.scene.entities.indexOf(this);
    if (index > -1) {
      this.scene.entities.splice(index, 1);
    }

    console.log(this.scene.entities.length);
    this.scene.time.delayedCall(this.wait, this.destroy, [], this);

  }

  Hurt(amount) {
    /*if (!this.awake && this.health > 0) {
      this.WakeUp()
      console.log("Despierta");
    } else if (this.awake && this.health <= 0) {
      this.Die();
      console.log("Muere");

    } else {
      this.setTintFill(0xffd7b1);
      this.scene.time.delayedCall(25, function () { this.clearTint(); }, [], this);
      this.health -= amount;
      this.Flinch();
      console.log("Ouch");

    }*/

    if (this.health >= 1) {
      if (this.awake) {
        this.setTintFill(0xffd7b1);
        this.scene.time.delayedCall(25, function () { this.clearTint(); }, [], this);
        this.health -= amount;
        this.Flinch();
        console.log("Ouch");
      } else {
        this.WakeUp()
        console.log("Despierta");
      }

    } else if(this.awake){
      this.Die();
      console.log("Muere");
    }


  }

  Update() {
    if (this.active) {
      if (this.canMove) {
        if (this.body.onFloor() &&  this.primaryTarget.y < this.y-16) {
          this.body.setVelocityY(-500);
        }

        let dir = this.primaryTarget.x-this.x;
        dir = dir / Math.abs(dir);
        this.body.setVelocityX(dir*100);
      }

      if (this.canAttack) {
        this.Attack();
        this.canAttack = false;
        this.scene.time.delayedCall(this.wait, function () { this.canAttack = true; }, [], this);
      }
    }
  }

  Attack() {
    console.log("Atacando");
    this.attacking = true;
    this.setTintFill(0xff1010);
    this.scene.time.delayedCall(this.wait / 2, function () { this.attacking = false; this.clearTint(); }, [], this);
  }

  CheckAttacking() { return this.attacking; }

  Flinch() { }

  /*Jump(){
    this.body.setVelocityY(-100);
  }*/
}