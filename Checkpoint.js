var Checkpoint = (function() {
	
	function Checkpoint(x, y, id) {
		this.id = id;
		this.sprite = game.add.sprite(x, y, 'checkpoint', 0, checkpoints);
		//this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.sprite.ent = this;
	}

	Checkpoint.prototype.update = function() {};

	Checkpoint.prototype.check = function() {
		sounds.save.play();
		this.sprite.frame = 1;
	};

	Checkpoint.prototype.solve = function() {
		this.sprite.frame = 1;
		player.sprite.position.x = this.sprite.position.x + 16;
		player.sprite.position.y = this.sprite.position.y;
		function solve(sprite) {
			if(sprite.position.x > this.sprite.position.x)
				sprite.ent.solve();
		}

		enemies.forEach(solve, this);
		qboxs.forEach(solve, this);
		checkpoints.forEach(function(checkpoint) {
			if(checkpoint.position.x > this.sprite.position.x)
				checkpoint.frame = 1;
		}, this);
	};

	Checkpoint.prototype.isSolved = function() {
		var solved = true;

		function check(sprite) {
			if(sprite.position.x > this.sprite.position.x)
				if(!sprite.ent.isSolved())
					solved = false;
		}

		enemies.forEach(check, this);
		qboxs.forEach(check, this);

		return solved;
	};

	return Checkpoint;

})();