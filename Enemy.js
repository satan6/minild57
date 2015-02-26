var Enemy = (function() {

	var SPEED = 120;

	var State = {
		IDLE: 0,
		DEAD: 1,
		REVIVING: 2,
	};

	states = new FSM.States();

	states.enter[State.REVIVING] = function() {
		this.isAlive = true;
		this.sprite.animations.play("undie");
		sounds.hit.play();

		var timer = game.time.create();
		timer.add(500 /* 3 frames at 6 fps */, function() {
			this.fsm.enter(State.IDLE);
		}, this);
		timer.start();
	};

	states.enter[State.IDLE] = function() {
		this.sprite.body.immovable = false;
		this.sprite.animations.play("walk", null, true);
		this.aicurrent = 0;
	};
	states.update[State.IDLE] = function() {
		var current = this.aipath[this.aicurrent];
		if(current.dist(this.sprite.body) < SPEED / 59) {
			this.sprite.body.x = current.x;
			this.sprite.body.y = current.y;
			this.aicurrent++;
			if(this.aicurrent >= this.aipath.length)
				this.aicurrent = 0;
		} else {
			var amount = current.minus(this.sprite.body).norm().times(SPEED);
			this.sprite.body.velocity.x = amount.x;
			this.sprite.body.velocity.y = amount.y;
		}
	};

	function Enemy(x, y, aipath) {
		this.isAlive = false;
		this.aipath = aipath;
		this.sprite = game.add.sprite(x, y, 'enemy', 0, enemies);
		//this.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(this.sprite);
		this.sprite.body.collideWorldBounds = true;
		this.sprite.body.immovable = true;

		this.sprite.animations.add('walk', [5, 6], 6);
		this.sprite.animations.add('undie', [0, 1, 2, 3, 4], 10);

		this.fsm = new FSM(this, states);
		this.fsm.enter(State.DEAD);

		this.sprite.ent = this;
	}

	Enemy.prototype.update = function() {
		this.fsm.update();
	};

	Enemy.prototype.revive = function() {
		this.fsm.enter(State.REVIVING);
	};

	Enemy.prototype.solve = function() {
		this.isAlive = true;
		this.fsm.enter(State.IDLE);
	};

	Enemy.prototype.isSolved = function() {
		return this.isAlive;
	};


	return Enemy;

})();