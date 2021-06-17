class Altar extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, p0, p1, key, weaponKey) {
        super(scene, x, y, key);
        this.key = key;
        scene.add.existing(this);
        this.scene.entities.push(this);

        this.player;
        this.otherAltar;
        this.done = false;
        this.weapon = scene.add.image(x, y - 16, weaponKey);

        this.p0 = p0;
        this.p1 = p1;

        this.setOrigin(.5, 0);
        this.activated = false;
        this.setDepth(0);

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
    }

    Deactivate() {
        if (this.activated) {
            this.player = null;
            this.activated = false;
            this.anims.play("deactivation" + this.key, true);
        }
    }

    Update() {
        if (this.player && Math.abs(this.x - this.player.x) > 32) {
            this.Deactivate();
        } else if (Math.abs(this.x - this.p0.x) < 32) {
            if (!this.activated && !this.done) {
                this.anims.play("activation" + this.key, true);
                this.activated = true;
                this.player = this.p0;
            }
        } else if (Math.abs(this.x - this.p1.x) < 32) {
            if (!this.activated && !this.done) {
                this.anims.play("activation" + this.key, true);
                this.activated = true;
                this.player = this.p1;
            }
        }
    }
}