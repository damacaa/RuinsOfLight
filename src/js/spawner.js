class Spawner extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, null);

        this.visible = false;

        scene.add.existing(this);

        this.scene.entities.push(this);

        this.canSpawnEnemies = false;
        this.nextSpawnTime = 0;
        this.spawnWait = 1000;
        this.maxEnemies = 20;

        this.setOrigin(0,0);

        this.setDepth(10);
    }

    Update(time, delta) {
        if (this.canSpawnEnemies && !this.scene.camera.worldView.contains(this.x, this.y) && !this.scene.camera1.worldView.contains(this.x, this.y)) {

            let rand = Math.random();

            if (rand < 0.4) {
                let randomEnemy = new Ball(this.scene, this.x, this.y);
                randomEnemy.WakeUp();
            } else if (rand < 0.7) {
                let randomEnemy = new Drone(this.scene, this.x, this.y);
                randomEnemy.WakeUp();
            } else if (rand < 1) {
                let randomEnemy = new Guardian(this.scene, this.x, this.y);
                randomEnemy.WakeUp();
            }

            this.nextSpawnTime = time + this.spawnWait;
            this.canSpawnEnemies = false;

            if (this.spawnWait > 2000) { this.spawnWait *= .99; }

        } else if (this.nextSpawnTime <= time && this.scene.entities.length < this.maxEnemies) {
            this.canSpawnEnemies = true;
        }
    }
}