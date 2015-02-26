var Platform = (function() {

	var SPEED = 1.5;

	function Platform(x, y, aipath) {
		this.aicurrent = 0;
		this.aipath = aipath;

		this.sprite = game.add.sprite(x, y, 'platform', 0, platforms);
		//this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.sprite.ent = this;
	}

	Platform.prototype.update = function() {
		var current = this.aipath[this.aicurrent];
		if(current.dist(this.sprite.body) < SPEED * 1.01) {
			this.sprite.body.x = current.x;
			this.sprite.body.y = current.y;
			this.aicurrent++;
			if(this.aicurrent >= this.aipath.length)
				this.aicurrent = 0;
		} else {
			var amount = current.minus(this.sprite.body).norm().times(SPEED);
			this.sprite.body.velocity.x = amount.x * 100;
			this.sprite.body.velocity.y = amount.y * 100;
		}
	};

	return Platform;

})();