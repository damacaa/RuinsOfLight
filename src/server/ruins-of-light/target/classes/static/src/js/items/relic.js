class Relic extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y) {
        super(scene, x, y, 'relic');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);

        this.setDepth(0);
        this.scene.physics.add.overlap(this, scene.players, this.GetRelic, null, scene);

        this.setOrigin(0,0);


        this.scene.tweens.add({
            targets: this,
            y: y - 5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }

    GetRelic(relic) {

        if (defeatedBosses == 0) {
            relic.scene.sound.play("effectGorilaRelic");
        } else if (defeatedBosses == 1) {
            relic.scene.sound.play("effectParrotRelic");
        }
        relic.scene.camera.flash(1000);
        relic.destroy();
        hasRelic = true;
    }
}