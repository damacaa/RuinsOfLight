class Spawner extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, null);

        this.visible = false;
        this.scene = scene;

        scene.add.existing(this);

        this.scene.entities.push(this);

        this.canSpawnEnemies = false;
        this.nextSpawnTime = 0;
        this.spawnWait = 3000;
        this.maxEnemies = 10;

        this.setOrigin(0, 0);

        this.setDepth(10);
    }

    Update(time, delta) {
        console.log(Phaser.Math.Distance.Between(this.scene.player0.x, this.scene.player0.x, this.x, this.y));
        if (this.canSpawnEnemies && (Phaser.Math.Distance.Between(this.scene.player0.x, this.scene.player0.x, this.x, this.y) < 500 || Phaser.Math.Distance.Between(this.scene.player1.x, this.scene.player1.x, this.x, this.y) < 500)) {
            this.Spawn();

            this.nextSpawnTime = time + this.spawnWait;
            this.canSpawnEnemies = false;

            if (this.spawnWait > 2000) { this.spawnWait *= .99; }

        } else if (this.nextSpawnTime <= time && this.scene.entities.length < this.maxEnemies) {
            this.canSpawnEnemies = true;
        }
    }

    Spawn() {
        let rand = Math.random();

        if (rand < 0.4) {
            let randomEnemy = new Ball(this.scene, this.x + 16, this.y + 16);
            randomEnemy.WakeUp();
            SendNewEntity(this.scene, 3, randomEnemy.id, randomEnemy.x, randomEnemy.y);
        } else if (rand < 0.7) {
            let randomEnemy = new Drone(this.scene, this.x + 16, this.y + 40);
            SendNewEntity(this.scene, 4, randomEnemy.id, randomEnemy.x, randomEnemy.y);
            randomEnemy.WakeUp();
        } else if (rand < 1) {
            let randomEnemy = new Guardian(this.scene, this.x + 16, this.y + 16);
            randomEnemy.WakeUp();
            SendNewEntity(this.scene, 2, randomEnemy.id, randomEnemy.x, randomEnemy.y);
        }
    }
}