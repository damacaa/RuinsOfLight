class Dungeons extends BaseScene {
    //https://www.youtube.com/watch?v=2_x1dOvgF1E
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/multiple-tile-sizes
    //https://phaser.io/examples/v3/view/game-objects/tilemap/collision/tile-callbacks

    constructor() {
        super('dungeon');
    }

    preload() {
        this.load.image('atlas', 'resources/levels/Tile_sheet.png');
        this.load.tilemapTiledJSON('map1_1', 'resources/levels/SueloNivel1.json');
        this.load.tilemapTiledJSON('map2_1', 'resources/levels/SueloNivel2.json');
        this.load.tilemapTiledJSON('map2_2', 'resources/levels/SueloNivel3.json');
    }

    CreateStage() {
        ////https://www.html5gamedevs.com/topic/41691-cant-get-group-to-work/
        if (gameMode == 1) { this.camera.startFollow(this.bowPlayer, true); } else { this.camera.startFollow(this.player0, true); }

        this.levelId = levelX + "_" + levelY;

        this.LoadTileMap('map' + this.levelId);

        this.previousDungeonDoor = null;

        for (let index = 0; index < this.map.width * 32; index += 159) {
            this.add.sprite(index, 0, 'background').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);
        }


        //Añade a cada nivel las puertas
        switch (levelX) {
            case 1:
                //1.1
                this.previousDungeonDoor = new SceneDoor(this, 32, 5 * 32, 'bossRoom', true);

                if (hasRelic) {
                    this.previousDungeonDoor.Open();
                } else {
                    this.previousDungeonDoor.Close();
                }

                this.door1 = new DungeonDoor(this, 7 * 32, 15 * 32, "2_1");
                this.door2 = new DungeonDoor(this, 65 * 32, 9 * 32, "2_2");

                break;

            case 2:
                switch (levelY) {
                    case 1:
                        //2.1
                        this.previousDungeonDoor = new DungeonStairs(this, 32, 5 * 32, "2_1");
                        break;

                    case 2:
                        //2.2
                        this.previousDungeonDoor = new DungeonStairs(this, 32, 7 * 32, "2_2");
                        break;

                    default:
                        break;
                }
                break;
            default:
                break;
        }

        //Dependiendo de de qué nivel vengan, los jugadores aparecen en un sitio u otro
        switch (whereAreTheyComingFrom) {
            case 0:
                //Aparecer en la entrada
                this.player0.x = this.previousDungeonDoor.x + 64;
                this.player1.x = this.previousDungeonDoor.x + 128;
                break;

            case 1:
                //Aparecer en puerta 1
                this.player0.x = this.door1.x - 48;
                this.player1.x = this.door1.x + 48;

                this.player0.y = this.door1.y;
                this.player1.y = this.door1.y;
                break;

            case 2:
                //Aparecer en puerta 2
                this.player0.x = this.door2.x - 48;
                this.player1.x = this.door2.x + 48;

                this.player0.y = this.door2.y;
                this.player1.y = this.door2.y;
                break;

            default:
                break;
        }

        this.dog = new Dog(this, this.player0.x, this.player0.y);


        //https://medium.com/@alizah.lalani/collecting-objects-in-phaser-3-platformer-games-using-tiled-4e9298cbfc85
        for (let i = 0; i < this.map.width; i++) {
            for (let j = 0; j < this.map.height; j++) {
                let tile = this.map.getTileAt(i, j);
                if (tile) {
                    //Pociones
                    let rand = Math.random();
                    if (rand > 0.95 && (tile.index == 2 || tile.index == 26)) {
                        this.potion = new HealthPotion(this, i * 32, (j - 1) * 32);
                    }

                    //Enemigos
                    if (tile.index == 33 && isOrange) {
                        new Spawner(this, i * 32 + 16, j * 32 + 16);
                    }

                    if (tile.index == 34 && !hasRelic && relicX == levelX && relicY == levelY) {
                        this.relic = new Relic(this, i * 32, j * 32 - 48);
                    }
                }
            }
        }

        if (relicX == levelX && relicY == levelY) {
            this.dog.FindWay(this.map, this.relic.x, this.relic.y);
        } else {
            //Must choose door1 or door2
            let tempX = relicX;
            let tempY = relicY;

            let lastX = tempX;
            let lastY = tempY;

            let count = 0;
            while (tempX != levelX && tempY != levelY && count < numberOfLevels) {
                lastX = tempX;
                lastY = tempY;

                tempX = tempX - 1;
                tempY = Math.ceil(tempY / 2);
                count++;
            }

            if (lastY % 2 == 0) { this.dog.FindWay(this.map, this.door2.x, this.door2.y); } else {
                this.dog.FindWay(this.map, this.door1.x, this.door1.y);
            }
        }

        this.sound.stopAll();
        this.musicBGDungeon = this.sound.play("music", { loop: true }, { volume: 2 });
    }

    UpdateStage() {
        if (hasRelic && skip && !this.previousDungeonDoor.open) {
            this.previousDungeonDoor.Open();
            ui.camera.flash(1000);
        }
    }
}



