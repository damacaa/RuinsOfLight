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
        this.camera.startFollow(this.bowPlayer, true);

        this.levelId = levelX + "_" + levelY;

        this.LoadTileMap('map' + this.levelId);

        this.previousDungeonDoor = null;

        for (let index = 0; index < this.map.width * 32; index += 159) {
            this.add.sprite(index, 0, 'background').setOrigin(0, 0).setScrollFactor(.25).setDepth(-2);
        }

        //Añade a cada nivel los items
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

                new Spawner(this, 21 * 32, 0);
                new Spawner(this, 50 * 32, 0);
                new Spawner(this, 26 * 32, 18 * 32);
                new Spawner(this, 65 * 32, 23 * 32);
                new Spawner(this, 3 * 32, 27 * 32);
                new Spawner(this, 60 * 32, 11 * 32);

                break;

            case 2:
                switch (levelY) {
                    case 1:
                        //2.1
                        this.previousDungeonDoor = new DungeonStairs(this, 32, 5 * 32, "2_1");

                        if (!hasRelic && relicX == levelX && relicY == levelY) {
                            new Relic(this, 9 * 32, 5 * 32);
                        }
                        break;

                    case 2:
                        //2.2
                        this.previousDungeonDoor = new DungeonStairs(this, 32, 7 * 32, "2_2");

                        if (!hasRelic && relicX == levelX && relicY == levelY) {
                            new Relic(this, 7 * 32, 7 * 32);
                        }
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }

        //Añade pociones
        for (let i = 0; i < this.map.width; i++) {
            for (let j = 0; j < this.map.width; j++) {
                let tile = this.map.getTileAt(i, j);
                let rand = Math.random();
                if (rand > 0.95 && tile && (this.map.getTileAt(i, j).index == 2 || this.map.getTileAt(i, j).index == 26)) {
                    this.potion = new HealthPotion(this, i * 32, (j - 1) * 32);
                }
            }
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
        
        this.sound.stopAll();
        this.musicBGDungeon = this.sound.play("music", { loop: true }, { volume: 2 });
    }

    UpdateStage() {
        if (hasRelic && skip && !this.previousDungeonDoor.open) {
            this.previousDungeonDoor.Open();
            this.cameras.main.flash(1000);
        }
    }
}



