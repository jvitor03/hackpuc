var radFinished = false;
var d2 = 0;
var pontoatual = new Ponto(0,0);

function radUpdate(game, pointer) {
	checkPointer(pointer,32);
	//if (pointerGrabbed){
		//if((currentPoint.x < 125 && currentPoint.x >= 0) && (currentPoint.y < 125 && currentPoint.y >= 0)){
		currentCursorPoint.x = currentPoint.x;
		currentCursorPoint.y = currentPoint.y;
		//}
	//}




	//debugRender();
}

p2 = new Phaser.Point(0, 0);
var stop = true;

function radRender(graphics) {

graphics.clear();	
graphics.lineStyle(1, 0xFFFFFF, 1);

//circulo

//graphics.beginFill(0xFFFF0B, 1);
//graphics.drawCircle(0,0,250);
//graphics.beginFill(0x000000, 1);
graphics.drawCircle(0,0,245);

//linha a ser girada
graphics.moveTo(0,0);
graphics.lineStyle(2, 0xFFFFFF,1);
graphics.lineTo(125,0);

//vetor do usuario
usuario = graphics;
graphics.moveTo(125,0);
graphics.lineStyle(2, 0xFFFFFF,1);
graphics.lineTo(currentPoint.x , currentPoint.y);


if (stop){//colocar
	p2.rotate(125,0,1,true,125);
	
}
graphics.moveTo(125,0);
graphics.lineTo(p2.x,p2.y);
if (p2.x >= 124){
	stop = false;
	}
}

function debugRender(){
	game.debug.pointer(game.input.mousePointer);
}

function funcao(){
	
}