var radFinished = false;
p2 = new Phaser.Point(100, 0);
var d2 = 0;

function radUpdate(game, pointer) {
	pointer.onTap.add(funcao, this);
	
}

function radRender(graphics) {
debugRender();
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
	graphics.lineStyle(2, 0xFFFFFF,1);
		graphics.moveTo(0,0);
		graphics.lineTo(pointer.x,pointer.y);
}