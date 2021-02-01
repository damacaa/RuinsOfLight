let ui;

class UI extends BaseMenuScene {
    constructor() {
        super('ui');
        this.healthBar;
        this.bossBar;

        this.playing = false;
        this.pause = false;
        this.maxNames = 15;

        this.buttons = [];
        this.mobile = mobileAndTabletCheck();

        this.playerInput = 0;
    }

    create() {
		this.input.addPointer(3);
		
        ui = this;

        this.camera = this.cameras.main;

        this.healthBar = new PlayerHealthBar(this, 10, 10, 'vidas').setScrollFactor(0).setOrigin(0, 0);

        this.text = this.add.text(460, 250, "", {
            fontFamily: '"PressStart2P-Regular"',
            fontSize: '7px',
            color: '#eeeeba',
            align: 'left'
        }).setDepth(10).setOrigin(1, 1).setScrollFactor(0).setLineSpacing(4);

        //Chat
        let x = 420;
        let y = 10;
        for (let i = 0; i < 9; i++) {
            let b = this.add.sprite(x, y, 'emoji').setFrame(i).setOrigin(0).setDepth(9).setInteractive().setVisible(false);
            b.on('pointerdown', function (event) {
                createChat(i, currentScene.sceneIdx.toString() + levelX.toString() + levelY.toString(), currentScene.player0.x, currentScene.player0.y);
            }, this);
            this.buttons.push(b);

            x += 18;

            if (i == 2 || i == 5) {
                x = 420;
                y += 18;
            }
        }


        this.fullscreen = this.add.sprite(10, 244, 'fullscreen').setOrigin(0).setDepth(9).setInteractive().setVisible(true);
        this.fullscreen.on('pointerdown', function (event) {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this);

        if (this.mobile) {
            this.left = this.add.sprite(20, 200, 'phoneInput').setFrame(0).setOrigin(0).setDepth(9).setInteractive().setVisible(false);
            this.left.on('pointerdown', function (event) {
                this.playerInput = -1;
            }, this);
            this.left.on('pointerup', function (event) {
                this.playerInput = 0;
            }, this);

            this.right = this.add.sprite(80, 200, 'phoneInput').setFrame(1).setOrigin(0).setDepth(9).setInteractive().setVisible(false);
            this.right.on('pointerdown', function (event) {
                this.playerInput = 1;
            }, this);
            this.right.on('pointerup', function (event) {
                this.playerInput = 0;
            }, this);

            this.jump = this.add.sprite(350, 220, 'phoneInput').setFrame(2).setOrigin(0).setDepth(9).setInteractive().setVisible(false);
            this.jump.on('pointerdown', function (event) {
                currentScene.player0.Jump();
            }, this);

            this.attack = this.add.sprite(410, 180, 'phoneInput').setFrame(3).setOrigin(0).setDepth(9).setInteractive().setVisible(false);
            this.attack.on('pointerdown', function (event) {
                currentScene.player0.Attack();
            }, this);
            this.attack.on('pointerup', function (event) {
                currentScene.player0.EnableAttack();
            }, this);
        }
    }

    update() {
        if (inGame && this.mobile) {
            currentScene.player0.Run(this.playerInput);
        }
        if (this.text.active) {
            if (isOnline) {
                if (players.length == 1) {
                    this.text.text = players.length + " player online:";
                } else {
                    this.text.text = players.length + " players online:";
                }

                for (let i = 0; i < Math.min(players.length, this.maxNames); i++) {
                    this.text.text += "\n   " + players[i].nick;
                    if (players[i].nick == player.nick) {
                        this.text.text += " (You)";
                    }
                }

                let excess = players.length - this.maxNames;
                if (excess > 0) {
                    this.text.text += "\nAnd " + excess + " others."
                }
            } else {
                this.text.text = "Offline";
            }
        }
    }

    EnableGameUI() {

        if (this.mobile) {
            this.left.setActive(true);
            this.right.setActive(true);
            this.jump.setActive(true);
            this.attack.setActive(true);

            this.left.setVisible(true);
            this.right.setVisible(true);
            this.jump.setVisible(true);
            this.attack.setVisible(true);
        }

        for (let b of this.buttons) {
            b.setVisible(true);
        }

        this.fullscreen.x = 395;
        this.fullscreen.y = 10;

        this.text.setOrigin(0, 0);
        this.text.x = 20;
        this.text.y = 30;
        this.maxNames = 4;

        this.healthBar.setVisible(true);
    }

    EnableMenuUI() {
        this.text.setOrigin(1, 1);
        this.text.x = 460;
        this.text.y = 260;
        this.maxNames = 15;

        for (let b of this.buttons) {
            b.setVisible(false);
        }

        this.fullscreen.x = 10;
        this.fullscreen.y = 244;

        this.healthBar.setVisible(false);
        if (this.mobile) {
            this.left.setActive(false);
            this.right.setActive(false);
            this.jump.setActive(false);
            this.attack.setActive(false);

            this.left.setVisible(false);
            this.right.setVisible(false);
            this.jump.setVisible(false);
            this.attack.setVisible(false);
        }
    }
}

//https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};