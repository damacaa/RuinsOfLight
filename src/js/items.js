class SceneDoor extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, sceneKey) {
        super(scene, x, y, 'puerta');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setSize(64, 64);
        this.body.setAllowGravity(false);

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetScene = sceneKey;

        this.setDepth(-2);
        this.scene.physics.add.overlap(this, scene.players, this.LoadTargetScene, null, scene);
    }

    LoadTargetScene(door) {
        levelX = 1;
        levelY = 1;
        whereAreTheyComingFrom = 0;
        door.scene.LoadScene(door.targetScene);
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

        this.setDepth(-2);
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
        super(scene, x, y, 'escalerasL');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        //this.body.setSize(50, 50);
        this.body.setAllowGravity(false);

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetScene = sceneKey;

        this.setDepth(-2);
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
        super(scene, x, y, 'escalerasL');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.body.setSize(50, 50);
        this.body.setAllowGravity(false);

        //this.scene.entities.push(this);

        this.scene = scene;
        this.targetDungeon = dungeonId;

        this.setDepth(-2);
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

        this.setDepth(-2);
        this.scene.physics.add.overlap(this, scene.players, this.GetRelic, null, scene);
    }

    GetRelic(relic) {
        relic.destroy();
        hasRelic = true;
    }
}