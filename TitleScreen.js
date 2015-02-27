var TitleScreen = (function() {

    function TitleScreen() {}

    var music;

    TitleScreen.prototype.preload = function() {
        game.load.audio('music', 'assets/high_tech_lab.ogg');
        game.load.image('help', 'assets/help.png');
    };

    TitleScreen.prototype.create = function() {
        //game.input.gamepad.start();
        
        if(!(game.renderer instanceof PIXI.WebGLRenderer)) {
            alert("Your game is running without WebGL. It will not look pretty.");
        }

        if(!game.sound.usingWebAudio) {
            alert("Your game is running without WebAudio. It will not sound good.");
        }

        game.stage.backgroundColor = 0x000000;

        this.titleText = game.add.text(640, 60, 'Through hell and back', { font: '100px Arial', fill: '#ffffff' });
        this.titleText.anchor.x = 0.5;

        this.authorText = game.add.text(1000, 180, 'Made by sathorn for MiniLD #57 - "Reversed"', { font: '16px Arial', fill: '#ffffff' });
        this.authorText.anchor.x = 1;

        this.text1 = game.add.text(640, 640, 'Press JUMP to start the game.', { font: '20px Arial', fill: '#ffffff' });
        this.text1.anchor.x = 0.5;

        game.add.sprite(700, 200, "help");

        var kbd = new KeyboardDisplay(game, 180, 300);
        game.add.existing(kbd);
        text = game.add.text(300, 290, 'Move', { font: '18px Arial', fill: '#ffffff' });
        text.anchor.x = 0.5;
        text = game.add.text(300, 390, 'Shoot', { font: '18px Arial', fill: '#ffffff' });
        text.anchor.x = 0.5;
        text = game.add.text(300, 490, 'Jump', { font: '18px Arial', fill: '#ffffff' });
        text.anchor.x = 0.5;

        if(!music) {
            music = game.add.audio('music');
            music.play('', 0, 0.8, true);
        }
    };

    TitleScreen.prototype.update = function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A))
            game.state.start('credits', true);
    };

    return TitleScreen;
})();