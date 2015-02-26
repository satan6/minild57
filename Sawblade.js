var Sawblade = (function() {

	var SPEED = 0.4;
	var ROTATION = 0.086;

	function Sawblade(x, y, aipath, offset) {
		this.aicurrent = 0;
		this.aipath = aipath;

		this.offset = offset || new vec2(0, 0);

		this.sprite = game.add.sprite(x + 32 + this.offset.x, y + 32 + this.offset.y, 'sawblade', 0, deadlyThings);
		this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.sprite.ent = this;
	}

	Sawblade.prototype.update = function() {
		this.sprite.rotation += ROTATION;

		if(!this.aipath) return;

		var current = this.aipath[this.aicurrent].plus(this.offset);
		//var pos = vec2.from(this.sprite.body).minus(new vec2(16, 16));
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

	return Sawblade;

})();