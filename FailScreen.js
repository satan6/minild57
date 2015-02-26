var FailScreen = (function() {

    function FailScreen() {}

    FailScreen.prototype.preload = function() {
        game.load.script('bsod', 'filters/BSOD.js');
        game.load.text("bsodshader", "filters/shaders/BSOD.fs");
    };

    FailScreen.prototype.init = function(args) {
        this.msg = args.msg;
    };

    FailScreen.prototype.create = function() {
        game.stage.backgroundColor = 0x0000ff;
        this.filter = game.add.filter("BSOD");
        
        var makeWorldBig = game.add.sprite(0, 0, null);
        makeWorldBig.width = WIDTH;
        makeWorldBig.height = HEIGHT;

        game.world.filters = [this.filter];

        var fontStyle = {
            font: "22px 'Andale Mono', Mono",
            fill: "#ffffff"
        };

        this.titleText = game.add.text(640, 180, 'Error #500: Internal Universe Error', fontStyle);
        this.titleText.anchor.x = 0.5;

        var text = 'There was a problem with the space-time continuum. Please try again later.';
        if(this.msg)
            text += "\nError Message: " + this.msg; 

        this.text0 = game.add.text(620, 260, text, fontStyle);
        this.text0.anchor.x = 0.5;

        this.text1 = game.add.text(640, 530, 'Press JUMP to try again later.', fontStyle);
        this.text1.anchor.x = 0.5;
    };

    FailScreen.prototype.update = function() {
        this.filter.update();

        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A))
            game.state.start('game', true);
    };

    return FailScreen;
})();