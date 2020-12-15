class SceneDoor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sceneKey, facingRight) {
        super(scene, x, y, 'puertaEntrada');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //this.body.setSize(64, 64);
        this.body.setAllowGravity(false);

        this.setOrigin(0,0);

        this.body.setSize(8, 64);
        
        if(facingRight){
            this.flipX = false;
            this.body.offset.x = 0;

        }else{
            this.flipX = true;
            this.body.offset.x = 64-8;
        }

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetScene = sceneKey;

        this.setDepth(4);
        this.scene.physics.add.overlap(this, scene.players, this.LoadTargetScene, null, scene);
    }

    LoadTargetScene(door) {
        levelX = 1;
        levelY = 1;
        whereAreTheyComingFrom = 0;
        door.scene.LoadScene(door.targetScene);
    }

    Open(){
        this.setFrame(0);
        this.body.enable = true;
    }

    Close(){
        this.setFrame(1);
        this.body.enable = false;
    }

}

class DungeonDoor extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, dungeonId) {
        super(scene, x, y, 'puerta');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setSize(64, 64);
        this.body.setAllowGravity(false);

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetDungeon = dungeonId;

        this.setDepth(0);
        this.scene.physics.add.overlap(this, scene.players, this.LoadTargetScene, null, scene);
    }

    LoadTargetScene(door) {

        let scene = door.scene.LoadScene('dungeon');
        //scene.levelId = door.targetDungeon;
        var fields = door.targetDungeon.split('_');

        levelX = parseInt(fields[0]);
        levelY = parseInt(fields[1]);

        whereAreTheyComingFrom = 0;
    }

}

class SceneStairs extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sceneKey) {
        super(scene, x, y, 'puertaEntrada');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0,0);
        this.body.setSize(8, 64);
        this.body.setAllowGravity(false);

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetScene = sceneKey;

        this.setDepth(4);
        this.scene.physics.add.overlap(this, scene.players, this.LoadTargetScene, null, scene);
    }

    LoadTargetScene(door) {
        levelX = 1;
        levelY = 1;
        whereAreTheyComingFrom = 0;
        door.scene.LoadScene(door.targetScene);
    }

}

class DungeonStairs extends Phaser.GameObjects.Sprite {

    //
    constructor(scene, x, y, dungeonId) {
        super(scene, x, y, 'puertaEntrada');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setOrigin(0,0);
        this.body.setSize(8, 64);
        this.body.setAllowGravity(false);

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetDungeon = dungeonId;

        this.setDepth(4);
        this.scene.physics.add.overlap(this, scene.players, this.LoadTargetScene, null, scene);
    }

    LoadTargetScene(door) {

        let scene = door.scene.LoadScene('dungeon');
        //scene.levelId = door.targetDungeon;
        var fields = door.targetDungeon.split('_');

        

        console.log(levelY);
        console.log(levelY % 2);
        if(levelY % 2 == 0) {
            whereAreTheyComingFrom = 2;
        }else{
            whereAreTheyComingFrom = 1;
        }

        levelX = parseInt(fields[0]);
        levelY = parseInt(fields[1]);

        //whereAreTheyComingFrom = 2;

    }
}

class Relic extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'relic');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setAllowGravity(false);

        this.setDepth(0);
        this.scene.physics.add.overlap(this, scene.players, this.GetRelic, null, scene);


        this.scene.tweens.add({
            targets: this,
            y: y-5,
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });
    }

    GetRelic(relic) {
        if(defeatedBosses == 0){
            relic.scene.sound.play("effectGorilaRelic");
            relic.relicCount = relic.relicCount+1 ;
        } else if (defeatedBosses == 1){
            relic.scene.sound.play("effectParrotRelic");
        }
        relic.scene.camera.flash(1000);
        relic.destroy();
        hasRelic = true;
    }
}