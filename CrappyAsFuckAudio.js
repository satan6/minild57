var Audio = (function() {

var Audio = {};


function AudioMixer(game) {
	this.game = game;
	this.ctx = game.sound.context;

	this.in = this.ctx.createGain();

	var compressor = this.ctx.createDynamicsCompressor(); // What does this even do
	compressor.connect(game.sound.masterGain);
	this.out = compressor;

	this.normalGain = this.ctx.createGain();
	this.in.connect(this.normalGain);
	this.normalGain.connect(this.out);
}

AudioMixer.prototype.addSound = function(sound) {
	sound.gainNode.disconnect(this.game.sound.masterGain);
	sound.gainNode.connect(this.in);
};

AudioMixer.prototype.addEffect = function(effect) {
	var gain = this.ctx.createGain();

	this.in.connect(effect.in);
	effect.out.connect(gain);
	gain.connect(this.out);

	return gain;
};

Audio.Mixer = AudioMixer;


var updateSounds = [];

function setPannerPosition(panner, x, y) {
	panner.setPosition((x - 640)/640 * 0.8, (y - 360)/360 * -0.8, -1);
}

Audio.makeSoundPositionial = function(sound, position, keepUpdated) {
	var panner = sound.context.createPanner();
	panner.panningModel = 'equalpower'; // Firefox wants this

	sound.externalNode = panner;
	panner.connect(sound.gainNode);

	setPannerPosition(panner, position.x, position.y);

	if(keepUpdated) {
		function update() {
			setPannerPosition(panner, position.x, position.y);
		}

		sound.onPlay.add(function() {
			updateSounds.push(update);
		});

		sound.onStop.add(function() {
			updateSounds.splice(updateSounds.indexOf(update), 1);
		});
	}
};

Audio.updatePositions = function() {
	for(var i in updateSounds)
		updateSounds[i]();
};


return Audio;

})();