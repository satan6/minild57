var EndbossScreen = (function() {

    function EndbossScreen() {}

    EndbossScreen.prototype.preload = function() {
        game.load.image("endboss", "assets/endboss.png");
        game.load.spritesheet("player", "assets/player.png", 20, 28);
    };

    var text = [
        "",
        "Yo. Sup mate?",
        "Oh, you fought your way through hell, demolished it on your way,\nand now you want me to let you out?",
        "Ok.",
        "Just clean up the mess you made and i'll let you out.\nHere, let me reverse time for you.",
        "Sorry that this game is so bad and makes no sense.",
        "kthxbye."
    ];

    EndbossScreen.prototype.create = function() {
        game.stage.backgroundColor = 0x000000;

        game.add.sprite(0, 0, "endboss");
        this.player = game.add.sprite(300, 500, "player", 0);
        this.player.scale.x = 6;
        this.player.scale.y = 6;

        this.current = 0;
        this.text = game.add.text(620, 180, text[this.current], {
            font: "20px Arial",
            fill: "#fff"
        });

        this.text1 = game.add.text(1240, 680, 'Press JUMP to continue.', {
            font: "14px Arial",
            fill: "#ffffff"
        });
        this.text1.anchor.x = 1;
        this.text1.anchor.y = 1;
        this.wasDown = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A);
    };

    EndbossScreen.prototype.update = function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
            if(!this.wasDown) {
                this.current++;
                if(this.current == text.length) {
                    var scroll = game.add.tween(this.player.position);
                    scroll.to({x:-64}, 1000).start();
                    scroll.onComplete.add(function() {
                        game.state.start('game', true);
                    });
                }
                if(this.current < text.length)
                    this.text.text = text[this.current];
            }
            this.wasDown = true;
        } else this.wasDown = false;
    };

    return EndbossScreen;
})();