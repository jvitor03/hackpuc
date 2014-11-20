var piFinished = false;

var initialPoint = new Ponto(0, 0);
var destPoint = new Ponto(100, 0);

var currentPointerRadius = 8;
var lineSize = 4;
var bgLineSize = 2;

var bgLnColor = 0x777777;
var lnColor = 0xFFFFFF;

/**
 * @param game Contexto game criado na página principal
 */
function piUpdate(game, pointer) {
	checkPointer(pointer);

	if (pointerGrabbed) {
		currentCursorPoint.x = Phaser.Math.clamp(currentPoint.x, initialPoint.x, destPoint.x);
	} else {
		currentCursorPoint.x = initialPoint.x;
	}
	debugRender(game);
}

function piRender(graphics) {
	// limpar a tela
	graphics.clear();

	backgroundRender(graphics);

	// Redefinir linestyle
	// linestyle(larguraDaLinha, cor, alpha);
	graphics.lineStyle(lineSize, lnColor, 1);

	graphics.moveTo(initialPoint.x, initialPoint.y);
	graphics.lineTo(currentCursorPoint.x, currentCursorPoint.y);

	// Vamos criar o beginFill(cor, alpha)
	graphics.beginFill(lnColor, 1);
	graphics.drawCircle(currentCursorPoint.x, currentCursorPoint.y, currentPointerRadius);
	
}

function backgroundRender(graphics) {
	graphics.lineStyle(bgLineSize, bgLnColor, 1);
	// Queremos desenhar o ponto que o usuário deve percorrer
	graphics.moveTo(currentCursorPoint.x, currentCursorPoint.y);
	graphics.lineTo(destPoint.x, destPoint.y);
}

function debugRender(game) {
	game.debug.pointer(game.input.mousePointer);
}