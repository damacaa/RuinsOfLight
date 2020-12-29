class HealthPotion extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'healthPotion');
        this.scene = scene;

        this.scene.add.existing(this);
        this.setDepth(1);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);
        this.body.enable = true;


        this.scene.physics.add.overlap(this, this.scene.players, this.TakePotion, null, this.scene);


        this.scene.tweens.add({
            targets: this,
            y: y - 5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }

    TakePotion(potion, player) {
        potion.destroy();

        if (player.health < 6) {
            player.health++;
            player.scene.health.UpdateLifes();
            player.scene.sound.play("effectPotion");
        }
    }
}