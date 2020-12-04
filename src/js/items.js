class Door extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sceneKey) {
        super(scene, x, y, 'puerta');
        scene.add.existing(this);

        this.scene = scene;
        this.sceneKey = sceneKey;

        this.setDepth(-2);
    }

    preload(){
    }

    create(){

    }

    Check() {
        if (Math.abs(this.scene.player0.x - this.x )< 10  && Math.abs(this.scene.player0.y - this.y )< 10) {
            this.scene.scene.start('dungeon');
            return true;
        }
        return false;
    }

}