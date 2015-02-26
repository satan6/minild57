var LoadingScreen = (function() {

    function LoadingScreen() {}

    LoadingScreen.prototype.preload = function() {};

    LoadingScreen.prototype.create = function() {
        this.progress = game.add.text(game.width/2, game.width/2, '100%', { font: '50px Arial', fill: '#ffffff' });
        this.progress.anchor.set(0.5, 0.5);
        this.progress.visible = false;

        game.state.states.title.preload();
        game.state.states.game.preload();
        game.state.states.endboss.preload();
        game.state.states.intro.preload();
        game.state.states.fail.preload();
        game.state.states.story.preload();
        game.load.start();

        // Don't flash the indicator on very fast loads
        var timer = game.time.create(true);

        timer.add(400, function() {
            if(game.load.progress < 66)
                this.progress.visible = true;
        }, this);

        timer.start();

        game.volumeControl.update();
    };

    var isLoaded = false;
    LoadingScreen.prototype.update = function() {
        this.progress.text = (100 - game.load.progress).toString() + "%";

        if(game.load.hasLoaded)
            game.state.start('title', true);
    };

    return LoadingScreen;

})();