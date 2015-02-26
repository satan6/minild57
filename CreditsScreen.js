var CreditsScreen = (function() {

    function CreditsScreen() {}

    CreditsScreen.prototype.preload = function() {
        
    };

    CreditsScreen.prototype.create = function() {
        game.stage.backgroundColor = 0x000000;

        var group = game.add.group();
        this.music = game.add.text(620, -30, 'Music', {
            font: "22px Arial",
            fill: "#aaa"
        }, group);
        this.music.anchor.x = 1;
        this.music.anchor.y = 0.5;
        this.artist = game.add.text(640, -30, '"High Tech Lab" by remaxim', {
            font: "18px Arial",
            fill: "#fff"
        }, group);
        this.artist.anchor.x = 0;
        this.artist.anchor.y = 0.5;

        var scroll = game.add.tween(group.position);
        scroll.to({y: 750}, 7000).start();
        scroll.onComplete.add(function() {
            game.state.start('story', true);
        });

        this.text1 = game.add.text(1240, 680, 'Press JUMP to skip.', {
            font: "14px Arial",
            fill: "#ffffff"
        });
        this.text1.anchor.x = 1;
        this.text1.anchor.y = 1;

        this.wasDown = game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A);
    };

    CreditsScreen.prototype.update = function() {
        if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
            if(!this.wasDown)
                game.state.start('story', true);
        } else this.wasDown = false;
    };

    return CreditsScreen;
})();