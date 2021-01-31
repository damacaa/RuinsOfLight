let minDoorDistance = 32;
class SceneDoor extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, sceneKey, facingRight) {
        super(scene, x, y, 'puertaEntrada');
        scene.add.existing(this);
        this.scene.entities.push(this);

        if (facingRight) {
            this.flipX = false;
            this.setOrigin(0, 0.5);
        } else {
            this.flipX = true;
            this.setOrigin(1, 0.5);
        }

        this.scene = scene;
        this.targetScene = sceneKey;

        this.open = true;

        this.setDepth(4);
    }

    Update(){
        if (this.open && (Phaser.Math.Distance.Between(this.scene.player0.x, this.scene.player0.y, this.x, this.y) < minDoorDistance || Phaser.Math.Distance.Between(this.scene.player1.x, this.scene.player1.y, this.x, this.y) < minDoorDistance)) {
            this.LoadTargetScene();
        }
    }

    LoadTargetScene() {
        if (!this.scene.fading) {
            levelX = 1;
            levelY = 1;
            whereAreTheyComingFrom = 0;
            this.scene.LoadScene(this.targetScene);
        }
    }

    Open() {
        this.setFrame(0);
        this.open = true;
    }

    Close() {
        this.setFrame(1);
        this.open = false;
    }

}

class DungeonDoor extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, dungeonId) {
        super(scene, x, y, 'puerta');
        scene.add.existing(this);
        this.scene.entities.push(this);

        this.scene = scene;
        this.targetDungeon = dungeonId;

        this.setDepth(0);
    }

    Update(){
        if ((Phaser.Math.Distance.Between(this.scene.player0.x, this.scene.player0.y, this.x, this.y) < minDoorDistance) || (Phaser.Math.Distance.Between(this.scene.player1.x, this.scene.player1.y, this.x, this.y) < minDoorDistance)) {
            this.LoadTargetScene();
        }
    }

    LoadTargetScene() {
        if (!this.scene.fading) {
            this.scene.LoadScene('dungeon');
            var fields = this.targetDungeon.split('_');
            levelX = parseInt(fields[0]);
            levelY = parseInt(fields[1]);
            whereAreTheyComingFrom = 0;
        }
    }
}

class DungeonStairs extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, dungeonId) {
        super(scene, x, y, 'puertaEntrada');
        scene.add.existing(this);
        this.scene.entities.push(this);

        this.setOrigin(0, 0.5);

        this.scene = scene;
        this.targetDungeon = dungeonId;

        this.setDepth(4);
    }

    Update(){
        if (Phaser.Math.Distance.Between(this.scene.player0.x, this.scene.player0.y, this.x, this.y) < minDoorDistance || Phaser.Math.Distance.Between(this.scene.player1.x, this.scene.player1.y, this.x, this.y) < minDoorDistance) {
            this.LoadTargetScene();
        }
    }

    LoadTargetScene() {
        if (!this.scene.fading) {
            levelX--;

            if (levelY % 2 == 0) {
                whereAreTheyComingFrom = 2;
                levelY = levelY / 2;
            } else {
                whereAreTheyComingFrom = 1;
                levelY = (levelY + 1) / 2;
            }

            this.scene.LoadScene('dungeon');
        }
    }
}


