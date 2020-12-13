class Altar extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, key, weaponKey) {
        super(scene, x, y, key);

        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAllowGravity(false);
        this.key = key;
        this.player;
        this.otherAltar;

        this.weapon = scene.add.image(x, y-10,weaponKey);

        this.scene.tweens.add({
            targets: this.weapon,
            y: this.weapon.y-3,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        this.setOrigin(.5, 0);

        this.activated = false;

        this.scene.entities.push(this);

        this.done = false;

        scene.anims.create({
            key: 'activation' + key,
            frames: scene.anims.generateFrameNumbers(key, { start: 0, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'deactivation' + key,
            frames: scene.anims.generateFrameNumbers(key, { start: 7, end: 0 }),
            frameRate: 10,
            repeat: 0
        });

        this.setDepth(0);
        this.scene.physics.add.overlap(this, scene.players, this.Activate, null, scene);
    }

    Activate(altar, player) {
        if (!altar.activated && !altar.done) {
            altar.anims.play("activation" + altar.key, true);
            altar.activated = true;
            altar.player = player;
        }
    }

    Deactivate() {

        if (this.activated) {
            this.player = null;
            this.activated = false;
            this.anims.play("deactivation" + this.key, true);
        }
    }

    Update() {
        if (this.player && Math.abs(this.x - this.player.x) > 32) { this.Deactivate(); }
    }
}