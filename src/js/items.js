class Door extends Phaser.GameObjects.Sprite {
    constructor(config, player0, player1, sceneKey) {
        super(config.scene, config.x, config.y, sceneKey+'Door');
        this.player0 = player0;
        this.player1 = player1;
        this.sceneKey = sceneKey;
    }

    preload(){

    }

    create(){
        
    }

    Check() {

        if (this.player0.x > 1000) {
            console.log("Premio");
            return true;
        }
        return false;
    }

}