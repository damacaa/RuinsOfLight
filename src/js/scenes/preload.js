class Preload extends Phaser.Scene {

    constructor() {
        super('preload');
    }

    preload() {

        //Juego
        {
            //Personajes
            this.load.spritesheet('p0noWeapon',
                'resources/animations/players/p0noWeapon.png', {
                frameWidth: 80,
                frameHeight: 64
            }
            );

            this.load.spritesheet('p0sword',
                'resources/animations/players/p0Sword.png', {
                frameWidth: 80,
                frameHeight: 64
            }
            );

            this.load.spritesheet('p0bow',
                'resources/animations/players/p0Bow.png', {
                frameWidth: 80,
                frameHeight: 64
            }
            );

            this.load.spritesheet('p1noWeapon',
                'resources/animations/players/p1noWeapon.png', {
                frameWidth: 80,
                frameHeight: 64
            }
            );

            this.load.spritesheet('p1sword',
                'resources/animations/players/p1Sword.png', {
                frameWidth: 80,
                frameHeight: 64
            }
            );

            this.load.spritesheet('p1bow',
                'resources/animations/players/p1Bow.png', {
                frameWidth: 80,
                frameHeight: 64
            }
            );

            this.load.spritesheet('arrow',
                'resources/animations/players/Flecha.png', {
                frameWidth: 21,
                frameHeight: 3
            }
            );

            //Enemigos
            this.load.spritesheet('greatGorila',
                'resources/animations/enemies/Gorila/Gorila.png', {
                frameWidth: 256,
                frameHeight: 256
            }
            );

            this.load.spritesheet('greatParrot',
                'resources/animations/enemies/Parrot/Parrot.png', {
                frameWidth: 256,
                frameHeight: 256
            }
            );

            this.load.spritesheet('gorilaProjectileKey',
                'resources/animations/enemies/Gorila/GorilaProjectile.png', {
                frameWidth: 64,
                frameHeight: 32
            }
            );

            this.load.spritesheet('ball',
                'resources/animations/enemies/Ball/Ball.png', {
                frameWidth: 63,
                frameHeight: 63
            }
            );


            this.load.spritesheet('drone',
                'resources/animations/enemies/Drone/Drone.png', {
                frameWidth: 32,
                frameHeight: 32
            }
            );

            this.load.spritesheet('droneShotKey',
                'resources/animations/enemies/Drone/DroneShot.png', {
                frameWidth: 6,
                frameHeight: 6
            }
            );

            this.load.spritesheet('guardian',
                'resources/animations/enemies/Guardian/guardian.png', {
                frameWidth: 129,
                frameHeight: 90

            }
            );

            //IA
            this.load.spritesheet('dog',
            'resources/img/animations/ia/perro.png', {
            frameWidth: 32,
            frameHeight: 32
        }
        );

            //Altares
            this.load.spritesheet('swordAltar',
                'resources/img/Items/Altares/AltarEspada.png', {
                frameWidth: 32,
                frameHeight: 32
            }
            );


            this.load.spritesheet('bowAltar',
                'resources/img/Items/Altares/AltarArco.png', {
                frameWidth: 32,
                frameHeight: 32
            }
            );

            //Puerta
            this.load.spritesheet('puertaEntrada',
                'resources/img/Items/Arcos de Paso/Entrada.png', {
                frameWidth: 64,
                frameHeight: 64
            }
            );

            //Escenario
            this.load.image('puerta', 'resources/img/Items/Arcos de Paso/Arco de Paso.png');
            this.load.image('escalerasL', 'resources/img/Items/Escaleras/escaleras_laterales.png');
            this.load.image('bossBackground', 'resources/img/bossBackground.png');
            this.load.image('background', 'resources/img/background.png');
            this.load.image('relic', 'resources/img/Items/Reliquia/Reliquia.png')
            this.load.image('healthPotion', 'resources/img/Items/Potions/HealthPotion.png')
            this.load.image('sword', 'resources/img/Items/Weapons/Sword.png')
            this.load.image('bow', 'resources/img/Items/Weapons/Bow.png')
            this.load.image('bossAltar', 'resources/img/Items/Altares/AltarBoss.png')

            this.load.image('atlas', 'resources/levels/Tile_sheet.png');
            this.load.tilemapTiledJSON('altarRoom', 'resources/levels/AltarRoom.json');
            this.load.tilemapTiledJSON('bossRoom', 'resources/levels/BossRoom.json');

            //Musica
            this.load.audio("music", "resources/audio/music.ogg"); // Musica fondo
            this.load.audio("battleMusic", "resources/audio/musicBattle.ogg"); // Musica fondo batalla
            this.load.audio("gameOverMusic", "resources/audio/musicGameOver.ogg"); // Musica derrota
            this.load.audio("winMusic", "resources/audio/musicWin.ogg"); // Musica victoria

            //Efectos jugadores
            this.load.audio("effectSword", "resources/audio/effects/players/sword.ogg"); // Efecto espada
            this.load.audio("effectSword2", "resources/audio/effects/players/sword2.ogg"); // Efecto espada
            this.load.audio("effectSword3", "resources/audio/effects/players/sword3.ogg"); // Efecto espada
            this.load.audio("effectSwordFall", "resources/audio/effects/players/swordFall.ogg"); // Efecto espada caida
            this.load.audio("effectBow", "resources/audio/effects/players/bow2.ogg"); // Efecto arco
            this.load.audio("effectHurt", "resources/audio/effects/players/hurt.ogg"); // Efecto daño
            this.load.audio("effectJump", "resources/audio/effects/players/jump.ogg"); // Efecto daño

            //Efectos enemigos
            this.load.audio("effectGorila", "resources/audio/effects/enemies/gorila.ogg"); // Efecto gorila ataque
            this.load.audio("effectBaseGorila", "resources/audio/effects/enemies/baseGorila.ogg"); // Efecto gorila
            this.load.audio("effectDeathGorila", "resources/audio/effects/enemies/gorilaDeath.ogg"); // Efecto gorila muerte
            this.load.audio("effectParrot", "resources/audio/effects/enemies/parrot.ogg"); // Efecto loro ataque
            this.load.audio("effectBaseParrot", "resources/audio/effects/enemies/baseParrot.ogg"); // Efecto loro
            this.load.audio("effectDeathParrot", "resources/audio/effects/enemies/parrotDeath.ogg"); // Efecto loro muerte
            this.load.audio("effectGuardian", "resources/audio/effects/enemies/guardian.ogg"); // Efecto guardian ataque
            this.load.audio("effectDrone", "resources/audio/effects/enemies/drone2.ogg"); // Efecto dron ataque
            this.load.audio("effectBall", "resources/audio/effects/enemies/ball.ogg"); // Efecto bola ataque

            //Reliquias
            this.load.audio("effectGorilaRelic", "resources/audio/effects/enemies/gorilaRelic.ogg"); // Efecto reliquia gorila
            this.load.audio("effectParrotRelic", "resources/audio/effects/enemies/parrotRelic.ogg"); // Efecto reliquia loro


            //Efectos intro
            this.load.audio("effectIntroDoor", "resources/audio/effects/doorClosed.ogg"); // Efecto puerta   ////////////////////////////////////
            this.load.audio("effectPotion", "resources/audio/effects/potion.ogg"); // Efecto pocion


            //Interfaz
            this.load.spritesheet('vidas',
                'resources/img/Interfaz/Vida2.png', {
                frameWidth: 154,
                frameHeight: 8
            }
            );

            this.load.spritesheet('controls',
                'resources/img/Interfaz/Controls.png', {
                frameWidth: 55,
                frameHeight: 47
            }
            );

            this.load.spritesheet('Attackcontrols',
                'resources/img/Interfaz/AttackControls.png', {
                frameWidth: 17,
                frameHeight: 18
            }
            );

            this.load.spritesheet('emoji',
                'resources/img/Emojis/emojis.png', {
                frameWidth: 16,
                frameHeight: 16
            }
            );
        }


        //Menus
        {
            this.load.spritesheet('block',
                'resources/img/Input/block.png', {
                frameWidth: 64,
                frameHeight: 32
            }
            );

            this.load.spritesheet('intro',
                'resources/img/intro.png', {
                frameWidth: 480,
                frameHeight: 270
            }
            );

            this.load.image('title', 'resources/img/Interfaz/Menu/Title.png');
            this.load.image('newGame', 'resources/img/Interfaz/Menu/Buttons1.png');
            this.load.image('credits', 'resources/img/Interfaz/Menu/Buttons2.png');
            this.load.image('leaderBoard', 'resources/img/Interfaz/Menu/Buttons5.png');
            this.load.image('skip', 'resources/img/Interfaz/Menu/Buttons4.png');
            this.load.image('records', 'resources/img/Interfaz/Menu/Buttons5.png');
            this.load.image('back', 'resources/img/Interfaz/Menu/Buttons7.png');
            this.load.image('menuBackground', 'resources/img/Interfaz/Menu/menuBackground.png');
            this.load.audio("music", "resources/audio/music.ogg");

            //Efectos intro
            this.load.audio("effectIntroDoor", "resources/audio/effects/doorClosed.ogg"); // Efecto puerta

            //Creditos
            this.load.spritesheet('endCredits',
                'resources/img/Interfaz/EndCredits/Credits.png', {
                frameWidth: 480,
                frameHeight: 270
            });

            //LeaderBoard
            this.load.spritesheet('leaderBoardBackground',
                'resources/img/Interfaz/LeaderBoard/LeaderBoardBackground.png', {
                frameWidth: 480,
                frameHeight: 270
            });

            this.load.image('continue', 'resources/img/Interfaz/Menu/Buttons6.png');
            this.load.audio("winMusic", "resources/audio/musicWin.ogg"); // Musica victoria

            //GameOver
            this.load.image('gameOver', 'resources/img/Interfaz/Game Over/Game Over.png');
        }
    }

    create() {
        this.scene.start('nameInput');
    }
}
