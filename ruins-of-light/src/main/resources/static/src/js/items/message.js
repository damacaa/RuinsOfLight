class Message extends Phaser.GameObjects.Sprite {

    constructor(scene,value, x, y, player, date) {
        super(scene, x, y, 'emoji');
        //this.player = player;
        this.value = value;

        /*scene.add.text(x, y-8, player, {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '10px',
            color: '#eeeeba',
            align: 'center'
        }).setOrigin(0.5).setDepth(10);*/

        this.scene.add.existing(this);

        this.setDepth(2);
        this.alpha = 0.9;
        
        this.setFrame(value);
    }
}