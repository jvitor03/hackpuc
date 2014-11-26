var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, "game", {create: create, update: update, render: render, preload: preload});

var graphics; 
var pointer;

function preload() {
	game.load.spritesheet('boneco', 'assets/spritesheet.png', 50, 100);
	game.load.image('pi', 'assets/pi.png');
}

function create() {
	game.stage.backgroundColor = 0xf2f2f2;
	graphics = game.add.graphics(game.world.centerX,game.world.centerY);
	pointer = game.input.activePointer;

	piCreate();
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
