var Trap = (function() {

	function Trap(x1, y1, x2, y2) {
		this.sprite = game.add.sprite(x1, y1, null, 0, deadlyThings);
		x2 += 32;
		y2 += 32;
		this.sprite.width = x2 - x1;
		this.sprite.height = y2 - y1;
		//this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.sprite.ent = this;
	}

	Trap.prototype.update = function() {};

	return Trap;

})();