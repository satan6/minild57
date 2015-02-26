var StoryScreen = (function() {

    function StoryScreen() {}

    StoryScreen.prototype.preload = function() {
        game.load.spritesheet("player", "assets/player.png", 20, 28);
    };

    StoryScreen.prototype.create = function() {
        game.stage.backgroundColor = 0x000000;

        this.text = game.add.text(640, 200, "Story:\n<le beutiful art not finish>", {
            font: "20px Arial",
            fill: "#fff"
        });
        this.text2 = game.add.text(640, 300, "Previously:\n1. You are in hell. For unknown reasons.\n2. You fight your way through hell to face Satan.", {
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

    StoryScreen.prototype.update = function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
            if(!this.wasDown) {
                game.state.start('endboss', true);
            }
            this.wasDown = true;
        } else this.wasDown = false;
    };

    return StoryScreen;
})();