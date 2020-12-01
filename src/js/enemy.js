class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.scene.enemies.add(this);

    //this.body.setAllowDrag(true)
    //this.body.setDrag(1000, 0)
    //this.body.setFriction(  50, 0)

    this.health = 1000;
    this.canMove;
    this.attacking;
    this.canAttack;
    this.wait = 2000;
    this.awake = false;
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

    this.scene.time.delayedCall(this.wait, this.destroy, [], this);

  }

  Hurt(amount) {
    if (!this.awake) { this.WakeUp() };

    if (this.health <= 0) {
      this.Die();
    } else {
      this.setTintFill(0xffd7b1);
      this.scene.time.delayedCall(25, function () { this.clearTint(); }, [], this);
      this.health -= amount;
    }
  }

  Update() {
    if (this.active) {
      if (this.canMove) {
        if (this.body.onFloor()) {
          this.body.setVelocityY(-250);
        }
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
}