var tmp = new Ponto();
tmp.set(2, 3);

document.write(tmp.x + " " + tmp.y + "<br />");

// Tudo relacionado ao Phaser
var game = new Phaser.Game(SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, "",
		{create: create, update: update, render: render});
var graphics;
var pointer;

function create() {
	graphics = game.add.graphics(0, 0);
	pointer = game.input.addPointer();
}

function update() {

}

function render() {
	// Comentar essa linha antes de entregar o jogo
	debugRender();

	// Limpamos a tela
	graphics.clear();

	// Redefinimos os line style, já que é necessário
	graphics.lineStyle(3, 0xffd900, 1);
	graphics.moveTo(30, 50);
	graphics.lineTo(250, 50);
	graphics.lineTo(100, 100);
}

function debugRender() {
	game.debug.pointer(game.input.mousePointer);
}

