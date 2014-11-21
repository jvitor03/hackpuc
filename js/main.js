var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, "", {create: create, update: update, render: render, preload: preload});

var graphics; 
var pointer;

function preload() {
	game.load.image('boneco', 'assets/boneco2.png');
}

function create() {
	graphics = game.add.graphics(game.world.centerX,game.world.centerY);
	pointer = game.input.activePointer;
	if (!piFinished) {
		//piUpdate(game);
	} else if(!piexFinished){
		piexCreate(game);
	}
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
