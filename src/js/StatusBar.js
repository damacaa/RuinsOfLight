//https://www.youtube.com/watch?v=dJwjv5LfJPs&ab_channel=NDCConferences

class StatusBar extends Phaser.GameObjects.Sprite {
    constructor(scene, currentBoss, nombreBoss) {
        super(scene, currentBoss, nombreBoss);

        this.scene = scene;
        this.scene.add.existing(this);

        this.currentBoss = currentBoss;

        this.barraVida = this.scene.add.rectangle(240, 240, 240, 7, 0xac3232).setScrollFactor(0).setDepth(10).setOrigin(0.5, 0.5);
        this.barraVida.setStrokeStyle(1, 0xeeeeba).setScrollFactor(0).setDepth(10).setOrigin(0.5, 0.5);

        this.text = this.scene.add.text(240, 255, nombreBoss, {
            fontFamily: '"CambriaB"',
            fontSize: '14px'
            , fill: '#ffffff'
        }).setScrollFactor(0).setOrigin(0.5, 0.5);

        this.maxHealth = currentBoss.health;
    }

    UpdateBar() {
        this.barraVida.width = this.currentBoss.health / this.maxHealth * 240;
    }

    Death() {
        this.barraVida.setFillStyle();
        this.barraVida.setStrokeStyle();
        this.text.destroy();
    }
}