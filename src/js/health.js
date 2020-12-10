
class Health extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, player0, player1, vidas) {
        super(scene, x, y, vidas);

        this.scene = scene;
        this.scene.add.existing(this);

        this.vidas = vidas;
        this.player0 = player0;
        this.player1 = player1;

        //P1 LLENO DE VIDA
        scene.anims.create({
            key: 'P0_6 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1,
            showOnStart: true
        });

        scene.anims.create({
            key: 'P0_5 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 7, end: 7 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_4 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 14, end: 14 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_3 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 21, end: 21 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_2 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 28, end: 28 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_1 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 35, end: 35 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_0 & P1_6',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 42, end: 42 }),
            frameRate: 10,
            repeat: -1,
        });



        //P0 LLENO DE VIDA
        scene.anims.create({
            key: 'P0_6 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_6 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_6 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_6 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_6 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_6 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1,
        });


        //P0 5 VIDAS
        scene.anims.create({
            key: 'P0_5 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 8, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_5 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 9, end: 9 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_5 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 10, end: 10 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_5 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 11, end: 11 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_5 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 12, end: 12 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_5 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 13, end: 13 }),
            frameRate: 10,
            repeat: -1,
        });

        //P0 4 VIDAS
        scene.anims.create({
            key: 'P0_4 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 15, end: 15 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_4 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 16, end: 16 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_4 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 17, end: 17 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_4 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 18, end: 18 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_4 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 19, end: 19 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_4 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 20, end: 20 }),
            frameRate: 10,
            repeat: -1,
        });

        //P0 3 VIDAS
        scene.anims.create({
            key: 'P0_3 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 22, end: 22 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_3 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 23, end: 23 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_3 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 24, end: 24 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_3 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 25, end: 25 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_3 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 26, end: 26 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_3 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 27, end: 27 }),
            frameRate: 10,
            repeat: -1,
        });

        //P0 2 VIDAS
        scene.anims.create({
            key: 'P0_2 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 29, end: 29 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_2 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 30, end: 30 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_2 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 31, end: 31 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_2 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 32, end: 32 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_2 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 33, end: 33 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_2 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 34, end: 34 }),
            frameRate: 10,
            repeat: -1,
        });

        //P0 1 VIDAS
        scene.anims.create({
            key: 'P0_1 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 36, end: 36 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_1 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 37, end: 37 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_1 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 38, end: 38 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_1 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 39, end: 39 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_1 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 40, end: 40 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_1 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 41, end: 41 }),
            frameRate: 10,
            repeat: -1,
        });

        //P0 0 VIDAS
        scene.anims.create({
            key: 'P0_0 & P1_5',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 43, end: 43 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_0 & P1_4',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 44, end: 44 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_0 & P1_3',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 45, end: 45 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_0 & P1_2',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 46, end: 46 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_0 & P1_1',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 47, end: 47 }),
            frameRate: 10,
            repeat: -1,
        });

        scene.anims.create({
            key: 'P0_0 & P1_0',
            frames: scene.anims.generateFrameNumbers(vidas, { start: 48, end: 48 }),
            frameRate: 10,
            repeat: -1,
        });


    }

    UpdateLifes() {
        //variable de acceso al primer switch
        var id = this.player0.health;
        //variable de acceso a los casos del switch anidado
        var id2 = this.player1.health;

        switch (id) {
            case 6:
                this.anims.play('P0_6 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_6 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_6 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_6 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_6 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_6 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_6 & P1_0', true);
                        break;
                }
                break;
            case 5:
                this.anims.play('P0_5 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_5 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_5 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_5 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_5 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_5 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_5 & P1_0', true);
                        break;
                }
                break;
            case 4:
                this.anims.play('P0_4 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_4 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_4 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_4 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_4 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_4 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_4 & P1_0', true);
                        break;
                }
                break;
            case 3:
                this.anims.play('P0_3 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_3 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_3 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_3 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_3 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_3 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_3 & P1_0', true);
                        break;
                }
                break;
            case 2:
                this.anims.play('P0_2 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_2 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_2 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_2 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_2 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_2 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_2 & P1_0', true);
                        break;
                }
                break;
            case 1:
                this.anims.play('P0_1 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_1 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_1 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_1 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_1 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_1 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_1 & P1_0', true);
                        break;
                }
                break;
            case 0:
                this.anims.play('P0_0 & P1_6', true);
                switch (id2) {
                    case 5:
                        this.anims.play('P0_0 & P1_5', true);
                        break;
                    case 4:
                        this.anims.play('P0_0 & P1_4', true);
                        break;
                    case 3:
                        this.anims.play('P0_0 & P1_3', true);
                        break;
                    case 2:
                        this.anims.play('P0_0 & P1_2', true);
                        break;
                    case 1:
                        this.anims.play('P0_0 & P1_1', true);
                        break;
                    case 0:
                        this.anims.play('P0_0 & P1_0', true);
                        break;
                }
                break;
        }
    }




}


