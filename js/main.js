var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, "game", {create: create, update: update, render: render, preload: preload});

var graphics; 
var pointer;

var piText;

function preload() {
	//game.load.image('boneco', 'assets/boneco2.png');
	game.load.spritesheet('boneco', 'assets/spritesheet.png', 50, 100);
	game.load.image('pi', 'assets/pi.png');
	//game.load.spritesheet('boneco2', 'assets/head_smash_SS.png', 50, 100);
	//game.load.spritesheet('boneco2', 'assets/ground_iddle_SS.png',50 ,100);
}

function create() {
	game.stage.backgroundColor = 0xf2f2f2;
	graphics = game.add.graphics(game.world.centerX,game.world.centerY);
	pointer = game.input.activePointer;
	piText = game.add.sprite(1000, 1000, 'pi');

	piexCreate(game);
}

function update() {
	if (!piFinished) {
		piUpdate(game, pointer);
	} else if(!piexFinished){
		piexUpdate(game, pointer);
	}
}

function render() {
	if(!piFinished){
		piRender(graphics);
	} else if(!piexFinished){
		piexRender(graphics);
	}
}
