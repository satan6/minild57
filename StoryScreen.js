var StoryScreen = (function() {

    function StoryScreen() {}

    StoryScreen.prototype.preload = function() {
        game.load.spritesheet("player", "assets/player.png", 20, 28);
        game.load.image("story", "assets/story.png");
    };

    var text = [
        '',
        'You are in hell. For unknown reasons.',
        'You fight your way through hell.',
        'Now you will face Satan.'
    ];

    StoryScreen.prototype.create = function() {
        game.stage.backgroundColor = 0x000000;

        game.add.sprite(0, 0, "story", 0);
        this.player = game.add.sprite(460, 400, "player", 0);


        this.player.addChild(game.make.text(-40, 0, "You", {
            font: "20px Arial",
            fill: "#fff"
        }));

        this.current = 0;
        this.text = game.add.text(640, 680, text[this.current], {
            font: "20px Arial",
            fill: "#ffffff"
        });
        this.text.anchor.x = 0.5;
        this.text.anchor.y = 1;

        this.text1 = game.add.text(1240, 680, 'Press JUMP to continue.', {
            font: "14px Arial",
            fill: "#ffffff"
        });
        this.text1.anchor.x = 1;
        this.text1.anchor.y = 1;
        this.wasDown = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A);
        this.allowInput = true;
    };

    StoryScreen.prototype.update = function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
            if(!this.wasDown) {
                if(this.allowInput) {
                    switch(this.current) {
                        case 0:
                            this.text.text = "You are in hell. For unknown reasons.";
                            break;
                        case 1:
                            this.text.text = "You fight your way through hell.";
                            this.allowInput = false;
                            var scroll = game.add.tween(this.player.position);
                            scroll.to({x: 780}, 1000).start();
                            scroll.onComplete.add(function() {
                                this.allowInput = true;
                            }, this);
                            break;
                        case 2:
                            this.text.text = "Now you will have to face Satan.";
                            break;
                        case 3:
                            this.allowInput = false;
                            var scroll = game.add.tween(this.player.position);
                            scroll.to({x: 850}, 400).start();
                            scroll.onComplete.add(function() {
                                game.state.start('endboss', true);
                            }, this);
                            break;
                    }

                    this.current++;
                }
            }
            this.wasDown = true;
        } else this.wasDown = false;
    };

    return StoryScreen;
})();