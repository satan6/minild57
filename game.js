var Tile = {
    FULL: 1,
    GROUND: 2,
    SPEARS: 3,
    GROUND_R: 4,
    GROUND_L: 5,
    GROUND_RL: 6,
    DOOR: 16,
};

var MAP_WIDTH = 128 * 32;
var MAP_HEIGHT = 23 * 32;

var map, player, enemies, bullets, platforms, qboxs, deadlyThings, checkpoints, background, filterPreBlur, filter, sounds = {}, currentCheckpoint = 0;

function crashUniverse(msg) {
    game.state.start('fail', true, false, {msg: msg});
}

function GameState() {}

GameState.prototype.preload = function() {
    game.load.tilemap('map1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileset', 'assets/tileset.png');
    game.load.image('bullet', 'assets/bullet.png');
    game.load.image('background', 'assets/background.png');
    game.load.image('sawblade', 'assets/sawblade.png');
    game.load.image('help', 'assets/help.png');
    game.load.spritesheet('player', 'assets/player.png', 20, 28);
    game.load.spritesheet('enemy', 'assets/enemy_spritesheet.png', 32, 32);
    game.load.spritesheet('checkpoint', 'assets/checkpoint.png', 32, 32);
    game.load.spritesheet('qbox', 'assets/qbox.png', 32, 32);
    game.load.image('platform', 'assets/platform.png');
    game.load.audio('shoot', 'assets/shoot2.wav');
    game.load.audio('hit', 'assets/hit2.wav');
    game.load.audio('jump', 'assets/jump.wav');
    game.load.audio('pickup', 'assets/pickup2.wav');
    game.load.audio('save', 'assets/pickup.wav');

    game.load.script('blurx', 'filters/BlurX.js');
    game.load.script('game', 'filters/Game.js');
    game.load.text("gameshader", "filters/shaders/Game.fs");
};

GameState.prototype.create = function() {
    game.stage.backgroundColor = 0x666666;
    filter = game.add.filter("Game");
    filterPreBlur = game.add.filter("BlurX");

    this.world = world = game.add.group();
    this.world.filters = [filterPreBlur, filter];
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 1400;


    // Background

    background = game.add.tileSprite(0, 0, WIDTH, HEIGHT, 'background', 0, world);
    background.fixedToCamera = true;


    // Tilemap

    map = game.add.tilemap('map1');
    map.addTilesetImage("tileset", "tileset");

    map.setCollision(Tile.FULL);
    map.setCollision(Tile.GROUND);
    map.setCollision(Tile.GROUND_R);
    map.setCollision(Tile.GROUND_L);
    map.setCollision(Tile.GROUND_RL);
    map.setCollision(Tile.DOOR);


    // Layers

    map.layerGround = map.createLayer("Ground", WIDTH, HEIGHT, world);
    map.layerGround.resizeWorld();
    //map.layerForeground = map.createLayer("Foreground", WIDTH, HEIGHT, world);
    //map.layerGround.debug = true;


    // Groups

    platforms = game.add.group(world);
    qboxs = game.add.group(world);
    checkpoints = game.add.group(world);
    deadlyThings = game.add.group(world);
    enemies = game.add.group(world);
    bullets = game.add.group(world);


    // Sounds
    
    sounds.shoot = game.add.audio('shoot');
    sounds.jump = game.add.audio('jump');
    sounds.pickup = game.add.audio('pickup');
    sounds.hit = game.add.audio('hit');
    sounds.save = game.add.audio('save');


    // Level

    setupLevel1();
    game.camera.follow(player.sprite, Phaser.Camera.FOLLOW_PLATFORMER);
    if(currentCheckpoint)
        checkpoints.forEach(function(checkpoint) {
            if(checkpoint.ent.id == currentCheckpoint)
                checkpoint.ent.solve();
        });


    // Stuff

    /*game.time.advancedTiming = true;
    fpsText = game.add.text(
        20, 20, '', { font: '16px Arial', fill: '#ffffff' }
    );
    fpsText.fixedToCamera = true;*/

    this.setupPause();
};

GameState.prototype.update = function() {
    /*if(game.time.fps !== 0) {
        fpsText.setText(game.time.fps + ' FPS');
    }*/

    background.tilePosition.x = -game.camera.position.x * 0.1;

    game.physics.arcade.collide(player.sprite, map.layerGround);
    game.physics.arcade.collide(player.sprite, platforms);
    game.physics.arcade.collide(player.sprite, qboxs);
    if(game.physics.arcade.collide(player.sprite, deadlyThings/*, null, function(player, deadly) {
        if(deadly.ent instanceof Sawblade)
            return vec2.from(player.body).dist(vec2.from(deadly.body)) < 40;
        return true;
    }*/))
        crashUniverse("How can you be alive after you died?");
    game.physics.arcade.collide(enemies, map.layerGround);

    game.physics.arcade.overlap(player.sprite, checkpoints, function(player, checkpoint) {
        if(checkpoint.ent.id > currentCheckpoint && checkpoint.ent.isSolved()) {
            checkpoint.ent.check();
            currentCheckpoint = checkpoint.ent.id;
            if(checkpoint.ent.id == 5) {
                currentCheckpoint = 0;
                game.state.start('intro', true);
            }
        }
    });


    game.physics.arcade.collide(player.sprite, enemies, function(player, enemy) {
        crashUniverse("How can you be alive after you died?");
    }, function(player, enemy) {
        return enemy.ent.isAlive;
    });

    game.physics.arcade.collide(bullets, player.sprite, function(player, bullet) {
        bullet.destroy();
        sounds.shoot.play();
        player.ent.unshoot();
    });

    game.physics.arcade.collide(bullets, enemies, function(bullet, enemy) {
        crashUniverse("How can an enemy be alive after it died?");
    }, function(bullet, enemy) {
        return enemy.ent.isAlive;
    });

    if(game.physics.arcade.collide(bullets, map.layerGround))
        crashUniverse("How can a shot exist if it wasn't fired?");

    bullets.forEach(function(bullet) {
        if(bullet.position.x < 0 || bullet.position.x > MAP_WIDTH)
            crashUniverse("How can a shot exist if it wasn't fired?");
    });

    player.update();

    enemies.forEach(function(enemy) {
        enemy.ent.update();
    });

    platforms.forEach(function(platform) {
        platform.ent.update();
    });

    deadlyThings.forEach(function(deadly) {
        deadly.ent.update();
    });

    qboxs.forEach(function(qbox) {
        qbox.ent.update();
    });

    filter.uniforms.playerPos.value.x = player.sprite.position.x - game.camera.x;
    filter.uniforms.playerPos.value.y = player.sprite.position.y - game.camera.y;
    filterPreBlur.uniforms.playerPos.value.x = player.sprite.position.x - game.camera.x;
    filterPreBlur.uniforms.playerPos.value.y = player.sprite.position.y - game.camera.y;
    filter.update();

    if(game.input.keyboard.isDown(Phaser.Keyboard.ESC) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_START))
        this.pauseGame();
};

GameState.prototype.shutdown = function() {
    //sounds.music.stop();
};

GameState.prototype.setupPause = function() {
    var bm = game.add.bitmapData(game.width, game.height);
    bm.context.fillStyle = "black";
    bm.context.fillRect(0, 0, game.width, game.height);

    this.pauseOverlay = game.make.sprite(0, 0, bm);
    this.pauseOverlay.fixedToCamera = true;
    this.pauseOverlay.alpha = 0.8;
    var pauseText = game.make.text(
        450, game.height/2, 'Paused', { font: '30px Arial', fill: '#ffffff' }
    );
    pauseText.anchor.set(0.5, 0.5);
    var resumeText = game.make.text(
        450, game.height/2 + 100, 'Press SPACE to continue.', { font: '14px Arial', fill: '#ffffff' }
    );
    resumeText.anchor.set(0.5, 0);
    this.pauseOverlay.addChild(pauseText);
    this.pauseOverlay.addChild(resumeText);
    this.pauseOverlay.addChild(game.make.sprite(700, 200, "help"));
};

GameState.prototype.pauseGame = function() {
    if(game.paused) return;
    game.add.existing(this.pauseOverlay);
    game.paused = true;
    this.pauseOverlay.wasDown = false;
};

GameState.prototype.pauseUpdate = function() {
    if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || game.input.gamepad.pad1.isDown(Phaser.Gamepad.XBOX360_A)) {
        if(!this.pauseOverlay.wasDown) return;
        game.world.remove(this.pauseOverlay);
        game.paused = false;
    } else 
        this.pauseOverlay.wasDown = true;
};