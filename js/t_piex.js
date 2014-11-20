var radFinished = false;
var dist = 0;
var x = 0;
var pontoatual = new Ponto(0,0);

function piexUpdate(game, pointer) {
	checkPointer(pointer,32);

	game.time.advancedTiming = true;
	
	//translação circunferencia
	x = game.time.totalElapsedSeconds();
	if (dist < 100*Math.PI){
		//dist = dist +1;
	}

	debugRender();
}

function piexRender(graphics){

	graphics.clear();
	planoCartesiano(graphics);
	graphics.lineStyle(1, 0xFFFFFF, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	graphics.arc(-300 + dist,0,50,dist/50+2.1,dist/50+7.4);

}

var y = 0;

function planoCartesiano(graphics){
	graphics.lineStyle(3, 0xffd900, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	y = 0;
	graphics.moveTo(Math.PI*100 - 300,60);
	graphics.lineTo(Math.PI*100 - 300,70);
	for (var x= 0; x<12;x++){
		y = y+100;
		graphics.moveTo(-600+y,40);
		graphics.lineTo(-600+y,60);
	}

}

function debugRender(){
	game.debug.pointer(game.input.mousePointer);
}