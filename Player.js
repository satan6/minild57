var Player = (function() {

	var SPEED = 300;
	var JUMP_SPEED = -550;

	function Player(x, y) {
		this.didShoot = false;
		this.didJump = false;

		this.sprite = game.add.sprite(x, y, 'player', 0, world);
		this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.mass = 100;

		this.sprite.animations.add('walk', [0, 1, 2, 1], 6);
		this.sprite.animations.play('walk', 6, true);

		this.pad = game.input.gamepad.pad1;

		this.sprite.ent = this;
	}

	Player.prototype.shoot = function() {
		var bullet = game.add.sprite(this.sprite.position.x, this.sprite.position.y, 'bullet', 0, bullets);
		bullet.anchor.setTo(0.5, 0.5);
		game.physics.enable(bullet);
		//bullet.body.collideWorldBounds = true;
		bullet.body.allowGravity = false;
		
		var step = 15 * this.sprite.scale.x;
		this.didShoot = true;

		while(true) {
			if(game.physics.arcade.overlap(bullet, enemies, function(bullet, enemy) {
				enemy.ent.revive();
			}, function(bullet, enemy) {
				return !enemy.ent.isAlive;
			})) {
				break;
			}

			if(game.physics.arcade.overlap(bullet, map.layerGround)) {
				break;
			}

			bullet.body.x += step;

			if(bullet.body.x < 20) {
				bullet.body.x = 17;
				break;
			}

			if(bullet.body.x > MAP_WIDTH - 17) {
				bullet.body.x = MAP_WIDTH - 17;
				break;
			}
		}

		bullet.body.velocity.x = -350 * this.sprite.scale.x;
	};

	Player.prototype.update = function() {
		var xaxis = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X);
		var yaxis = this.pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y);

		if(game.input.keyboard.isDown(Phaser.Keyboard.A)) {
			player.sprite.body.velocity.x = -SPEED;
			player.sprite.scale.x = -1;
		} else if(game.input.keyboard.isDown(Phaser.Keyboard.D)) {
			player.sprite.body.velocity.x = SPEED;
			player.sprite.scale.x = 1;
		} else if(Math.abs(xaxis) > 0.05) {
			player.sprite.body.velocity.x = xaxis < 0 ? -SPEED : SPEED;
			player.sprite.scale.x = xaxis > 0 ? 1 : -1;
		} else
			player.sprite.body.velocity.x = 0;

		if(this.sprite.body.touching.down && this.sprite.body.velocity.y < 0) // Kill y speed when on platform
			this.sprite.body.velocity.y = 0;

		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || this.pad.isDown(Phaser.Gamepad.XBOX360_A)) {
			if(!this.didJump &&
				(this.sprite.body.onFloor() || this.sprite.body.touching.down)
			) {
				player.sprite.body.velocity.y = JUMP_SPEED;
				sounds.jump.play();
			}
			this.didJump = true;
		} else this.didJump = false;

		if(game.input.keyboard.isDown(Phaser.Keyboard.L) || this.pad.isDown(Phaser.Gamepad.XBOX360_B)) {
			if(!this.didShoot) { 
				this.shoot();
			}
		} else this.didShoot = false;
	};


	return Player;

})();