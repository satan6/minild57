function setupLevel1() {
	var TW = 32;

	player = new Player(126 * TW, 3 * TW);

	new Enemy(121 * TW, 5 * TW, [
		new vec2(117 * TW, 5 * TW),
		new vec2(124 * TW, 5 * TW)
	]);
	new Enemy(81 * TW, 11 * TW, [
		new vec2(79 * TW, 11 * TW),
		new vec2(92 * TW, 11 * TW)
	]);
	new Enemy(85 * TW, 8 * TW, [
		new vec2(91 * TW, 8 * TW),
		new vec2(78 * TW, 8 * TW),
	]);
	new Enemy(89 * TW, 5 * TW, [
		new vec2(92 * TW, 5 * TW),
		new vec2(79 * TW, 5 * TW),
	]);
	new Enemy(80 * TW, 2 * TW, [
		new vec2(78 * TW, 2 * TW),
		new vec2(91 * TW, 2 * TW),
	]);
	new Enemy(56 * TW, 21 * TW, [
		new vec2(50 * TW, 21 * TW),
		new vec2(60 * TW, 21 * TW),
	]);
	new Enemy(62 * TW, 21 * TW, [
		new vec2(70 * TW, 21 * TW),
		new vec2(60 * TW, 21 * TW),
	]);
	new Enemy(53 * TW, 15 * TW, [
		new vec2(53 * TW, 15 * TW),
		new vec2(66 * TW, 15 * TW),
	]);
	new Enemy(57 * TW, 11 * TW, [
		new vec2(53 * TW, 11 * TW),
		new vec2(67 * TW, 11 * TW),
	]);
	new Enemy(35 * TW, 15 * TW, [
		new vec2(24 * TW, 15 * TW),
		new vec2(37 * TW, 15 * TW),
	]);
	new Enemy(26 * TW, 15 * TW, [
		new vec2(24 * TW, 15 * TW),
		new vec2(37 * TW, 15 * TW),
	]);
	new Enemy(34 * TW, 11 * TW, [
		new vec2(27 * TW, 11 * TW),
		new vec2(38 * TW, 11 * TW),
	]);
	new Enemy(34 * TW, 11 * TW, [
		new vec2(27 * TW, 11 * TW),
		new vec2(38 * TW, 11 * TW),
	]);
	new Enemy(6 * TW, 9 * TW, [
		new vec2(4 * TW, 9 * TW),
		new vec2(7 * TW, 9 * TW),
	]);
	new Enemy(17 * TW, 14 * TW, [
		new vec2(4 * TW, 14 * TW),
		new vec2(17 * TW, 14 * TW),
	]);

	new Platform(115 * TW, 14 * TW, [
		new vec2(115 * TW, 14 * TW),
		new vec2(122 * TW, 14 * TW)
	]);
	new Platform(97 * TW, 14 * TW, [
		new vec2(97 * TW, 14 * TW),
		new vec2(110 * TW, 14 * TW)
	]);
	new Platform(74 * TW, 20 * TW, [
		new vec2(74 * TW, 20 * TW),
		new vec2(74 * TW, 2 * TW)
	]);
	new Platform(51 * TW, 3 * TW, [
		new vec2(51 * TW, 3 * TW),
		new vec2(51 * TW, 20 * TW),
		new vec2(68 * TW, 20 * TW),
		new vec2(68 * TW, 3 * TW),
	]);
	new Platform(45 * TW, 3 * TW, [
		new vec2(45 * TW, 3 * TW),
		new vec2(45 * TW, 21 * TW)
	]);
	new Platform(39 * TW, 20 * TW, [
		new vec2(39 * TW, 20 * TW),
		new vec2(39 * TW, 3 * TW)
	]);
	new Platform(1 * TW, 6 * TW, [
		new vec2(1 * TW, 6 * TW),
		new vec2(1 * TW, 20 * TW)
	]);
	new Platform(19 * TW, 19 * TW, [
		new vec2(19 * TW, 19 * TW),
		new vec2(16 * TW, 19 * TW)
	]);

	new Sawblade(51 * TW, 2 * TW, [
		new vec2(51 * TW, 2 * TW),
		new vec2(69 * TW, 2 * TW),
		new vec2(69 * TW, 19 * TW),
		new vec2(51 * TW, 19 * TW),
	], new vec2(-16, -16));
	new Sawblade(51 * TW, 6 * TW, [
		new vec2(51 * TW, 6 * TW),
		new vec2(69 * TW, 6 * TW),
	], new vec2(-16, -16));
	//new Sawblade(62 * TW, 4 * TW, null, new vec2(0, -16));
	//new Sawblade(57 * TW, 4 * TW, null, new vec2(0, -16));
	new Sawblade(67 * TW, 4 * TW, null, new vec2(0, -16));
	new Sawblade(67 * TW, 8 * TW, null, new vec2(0, -16));
	new Sawblade(27 * TW, 20 * TW, null);
	new Sawblade(31 * TW, 20 * TW, null);
	new Sawblade(35 * TW, 20 * TW, null);
	new Sawblade(36 * TW, 14 * TW, [
		new vec2(36 * TW, 14 * TW),
		new vec2(40 * TW, 14 * TW),
	], new vec2(-16, -16));
	new Sawblade(39 * TW, 8 * TW, null, new vec2(0, -16));
	new Sawblade(9 * TW, 2 * TW, [
		new vec2(9 * TW, 2 * TW),
		new vec2(9 * TW, 13 * TW),
	], new vec2(-16, -16));
	new Sawblade(12 * TW, 13 * TW, [
		new vec2(12 * TW, 13 * TW),
		new vec2(12 * TW, 2 * TW),
	], new vec2(-16, -16));
	new Sawblade(15 * TW, 2 * TW, [
		new vec2(15 * TW, 2 * TW),
		new vec2(15 * TW, 13 * TW),
	], new vec2(-16, -16));

	new Trap(115 * TW, 17 * TW, 122 * TW, 17 * TW);
	new Trap(97 * TW, 17 * TW, 111 * TW, 17 * TW);
	new Trap(77 * TW, 21 * TW, 93 * TW, 21 * TW);
	new Trap(1 * TW, 21 * TW, 20 * TW, 21 * TW);

	new QBox(117 * TW, 7 * TW);
	new QBox(119 * TW, 7 * TW);
	new QBox(121 * TW, 7 * TW);
	new QBox(104 * TW, 9 * TW);
	new QBox(87 * TW, 16 * TW);
	new QBox(60 * TW, 4 * TW);
	new QBox(66 * TW, 13 * TW);
	new QBox(60 * TW, 17 * TW);
	//new QBox(60 * TW, 1 * TW);
	new QBox(55 * TW, 4 * TW);
	new QBox(65 * TW, 4 * TW);
	new QBox(24 * TW, 17 * TW);
	new QBox(30 * TW, 13 * TW);
	new QBox(25 * TW, 9 * TW);
	new QBox(28 * TW, 8 * TW);
	new QBox(5 * TW, 16 * TW);
	new QBox(5 * TW, 7 * TW);
	new QBox(5 * TW, 12 * TW);
	new QBox(20 * TW, 4 * TW);

	new Checkpoint(95 * TW, 13 * TW, 1);
	new Checkpoint(72 * TW, 19 * TW, 2);
	new Checkpoint(43 * TW, 20 * TW, 3);
	new Checkpoint(22 * TW, 2 * TW, 4);
	new Checkpoint(2 * TW, 2 * TW, 5);
}