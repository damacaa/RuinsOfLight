class Relic extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'relic');
        this.scene = scene;
        scene.add.existing(this);
        this.scene.entities.push(this);

        this.setDepth(0);
        this.setOrigin(0.5, 0.5);

        this.scene.tweens.add({
            targets: this,
            y: this.y - 5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.on = true;
    }

    Update() {
        if (this.on && (Phaser.Math.Distance.Between(this.scene.player0.x, this.scene.player0.y, this.x, this.y) < 32 || Phaser.Math.Distance.Between(this.scene.player1.x, this.scene.player1.y, this.x, this.y) < 32)) {
            this.GetRelic();
        }
    }

    GetRelic() {
        if (defeatedBosses == 0) {
            this.scene.sound.play("effectGorilaRelic");
        } else if (defeatedBosses == 1) {
            this.scene.sound.play("effectParrotRelic");
        }
        console.log("flasj")
        this.scene.camera.flash(1000);
        //this.enabled = false;
        this.visible = false;
        this.on = false;
        hasRelic = true;
    }
}