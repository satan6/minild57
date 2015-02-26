var QBox = (function() {

	function QBox(x, y) {
		this.solved = false;
		this.sprite = game.add.sprite(x, y+1, 'qbox', 0, qboxs);
		//this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;
		this.sprite.body.allowGravity = false;

		this.sprite.ent = this;
	}

	QBox.prototype.update = function() {
		if(this.sprite.body.touching.down) {
			if(this.isSolved())
				return crashUniverse("How can a box have a coin after it doesn't?");
			sounds.pickup.play();
			this.solve();
		}
	};

	QBox.prototype.solve = function() {
		this.sprite.frame = 1;
		this.solved = true;
	};

	QBox.prototype.isSolved = function() {
		return this.solved;
	};

	return QBox;

})();