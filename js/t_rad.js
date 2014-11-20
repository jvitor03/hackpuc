var radFinished = false;
p2 = new Phaser.Point(100, 0);
var d2 = 0;
var pontoatual = new Ponto(0,0);

function radUpdate(game, pointer) {
	if (pointer.isDown) {
		console.log("teste");
	};
	debugRender();
}

function radRender(graphics) {



graphics.clear();	
graphics.lineStyle(0);

graphics.beginFill(0xFFFF0B, 1);
graphics.drawCircle(0,0,250);
graphics.beginFill(0x000000, 1);
graphics.drawCircle(0,0,245);
graphics.moveTo(0,0);
graphics.lineStyle(2, 0xFFFFFF,1);
graphics.lineTo(125,0);
	
}

function debugRender(){
	game.debug.pointer(game.input.mousePointer);
}

function funcao(){
	
}