var IntroScreen = (function() {

    function IntroScreen() {}

    IntroScreen.prototype.preload = function() {
        game.load.image("home", "assets/home.png");
        game.load.image("sister", "assets/sister.png");
        game.load.image("brother", "assets/brother.png");
        game.load.image("love", "assets/love.png");
        game.load.spritesheet("player", "assets/player.png", 20, 28);
    };

    IntroScreen.prototype.create = function() {
        game.stage.backgroundColor = 0x000000;

        this.bgs = game.add.group();
        this.bg = game.add.sprite(0, 0, "home", 0, this.bgs);
        this.player = game.add.sprite(1000, 350, "player", 0);
        this.player.scale.x = 6;
        this.player.scale.y = 6;
        this.state = "home";
        this.allowInput = true;

        this.current = 0;
        this.text = game.add.text(1060, 330, "", {
            font: "20px Arial",
            fill: "#fff"
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
    };

    IntroScreen.prototype.update = function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
            if(!this.wasDown) {
                if(this.allowInput) {
                    switch(this.state) {
                        case "home":
                            switch(this.current) {
                                case 0:
                                    this.text.text = "Finally i am returning home to my one true love!";
                                    break;
                                case 1:
                                    this.text.text = "";
                                    this.text.position.x = 700;
                                    this.allowInput = false;
                                    var scroll = game.add.tween(this.player.position);
                                    scroll.to({x: 300}, 1000).start();
                                    scroll.onComplete.add(function() {
                                        this.bg.destroy();
                                        this.bg = game.add.sprite(0, 0, "sister", 0, this.bgs);
                                        this.player.position.x = 1280;
                                        var scroll = game.add.tween(this.player.position);
                                        scroll.to({x: 700}, 500).start();
                                        scroll.onComplete.add(function() {
                                            this.state = "sister";
                                            this.current = 0;
                                            this.allowInput = true;
                                        }, this);
                                    }, this);
                            }
                            break;
                        case "sister":
                            switch(this.current) {
                                case 0:
                                    this.text.text = "Hi sis.";
                                    break;
                                case 1:
                                    this.text.text = "Hi.";
                                    this.text.position.x = 500;
                                    this.text.position.y = 250;
                                    break;
                                case 2:
                                    this.text.text = "";
                                    this.text.position.x = 1100;
                                    this.text.position.y = 330;
                                    this.allowInput = false;
                                    var scroll = game.add.tween(this.player.position);
                                    scroll.to({x: -100}, 1000).start();
                                    scroll.onComplete.add(function() {
                                        this.bg.destroy();
                                        this.bg = game.add.sprite(0, 0, "brother", 0, this.bgs);
                                        this.player.position.x = 1280;
                                        var scroll = game.add.tween(this.player.position);
                                        scroll.to({x: 1100}, 300).start();
                                        scroll.onComplete.add(function() {
                                            this.state = "brother";
                                            this.current = 0;
                                            this.allowInput = true;
                                        }, this);
                                    }, this);
                            }
                            break;
                        case "brother":
                            switch(this.current) {
                                case 0:
                                    this.text.text = "My love! You look sharp as ever.";
                                    break;
                                case 1:
                                    this.text.text = "Oh you. I love you.";
                                    this.text.position.x = 830;
                                    this.text.position.y = 300;
                                    var emitter = game.add.emitter(1000, game.world.centerY, 400);
                                    emitter.makeParticles('love');

                                    emitter.gravity = -1;
                                    emitter.setAlpha(0.4, 0, 3000);
                                    emitter.setScale(0.8, 0, 0.8, 0, 3000);
                                    emitter.setXSpeed(-200, 200);
                                    emitter.setYSpeed(-500, -10);
                                    emitter.start(false, 3000, 150);
                                    break;
                                case 2:
                                    this.text.text = "I love you too, brother.";
                                    this.text.position.x = 1100;
                                    this.text.position.y = 330;
                                    break;
                                case 3:
                                    this.text.text = "";
                                    this.text1.text = "";
                                    this.allowInput = false;
                                    var darkness = game.add.group();
                                    var black = game.add.bitmapData(WIDTH, HEIGHT);
                                    black.fill(0, 0, 0, 1);
                                    var sprite = game.add.sprite(0, 0, black, 0, darkness);
                                    darkness.alpha = 0;
                                    var text = game.add.text(640, 360, "Support gay incest marriage.", {
                                        font: "30px Arial",
                                        fill: "#fff"
                                    }, darkness);
                                    text.anchor.x = 0.5;
                                    text.anchor.y = 0.5;

                                    var fade = game.add.tween(darkness);
                                    fade.to({alpha: 1}, 2000).start();

                                    var timer = game.time.create();
                                    timer.add(5000, function() {
                                        text.text = "WTF.";
                                    });
                                    timer.add(8000, function() {
                                        game.state.start('title', true);
                                    });
                                    timer.start();
                            }
                            break;
                    }
                    this.current++;
                }
            }
            this.wasDown = true;
        } else this.wasDown = false;
    };

    return IntroScreen;
})();