var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, "", {create: create, update: update, render: render, preload: preload});

var graphics; 
var pointer;

function preload() {

}

function create() {
	graphics = game.add.graphics(game.world.centerX,game.world.centerY);
	pointer = game.input.activePointer;
}

function update() {
	if (!piFinished) {
		piUpdate(game, pointer);
	} else if(!radFinished){
		radUpdate(game, pointer);
	}
}

function render() {
	if(!piFinished){
		piRender(graphics);
	} else if(!radFinished){
		radRender(graphics);
	}
}
