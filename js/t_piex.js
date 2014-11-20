
var radFinished = false;
var dist = 0;
var x = 0;
var pontoatual = new Ponto(0,0);


function piexUpdate(game, pointer) {
	

	checkPointer(pointer,33);
	//console.log(pointerDown);
	if (pointerGrabbed){
		currentCursorPoint.set(currentPoint.x, currentPoint.y);
		//if(currentPoint.x )
	} else{
		currentCursorPoint.set(34,63);
	}
	game.time.advancedTiming = true;
	0
	//translação circunferencia
	x = game.time.totalElapsedSeconds();
	if (dist < 100*Math.PI){
		dist = dist +1;
	}

	debugRender();
}

function piexRender(graphics){

	graphics.clear();
	planoCartesiano(graphics);
	graphics.lineStyle(2, 0xFFFFFF, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	graphics.arc(-300 + dist,0,50,dist/50+1.9,dist/50+7.5);

	graphics.beginFill(lnColor, 1);
	graphics.drawCircle(currentCursorPoint.x, currentCursorPoint.y, 15);
	graphics.endFill();
}

var y = 0;
var text;

function planoCartesiano(graphics){
	graphics.lineStyle(3, 0xffd900, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	y = 0;
	graphics.moveTo(Math.PI*100 - 300,60);
	graphics.lineTo(Math.PI*100 - 300,70);
	text = game.add.text(94, 370, "0", {fontSize: '24px', fill:'#FFFFFF'});
	for (var x= 0; x<12;x++){
		y = y+100;
		graphics.moveTo(-600+y,40);
		graphics.lineTo(-600+y,60);
		text = game.add.text(-8+y, 370, (y/100)-1, {fontSize: '24px', fill:'#FFFFFF'});
	}

}

function debugRender(){
	game.debug.pointer(game.input.mousePointer);
}