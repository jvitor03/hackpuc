
var piexFinished = false;
var dist = 0;
var x = 0;
var pontoatual = new Ponto(0,0);
var boneco;
function piexCreate(game){
	boneco = game.add.sprite(graphics.x,graphics.y-200, 'boneco');
}

var highlight = false;
var piActive = false;
var pos1x = 0;
var posy = 35;
var pos2x = 100;
var pos3x =200;
var pos4x =300;
var pos5x = -100;
var pos6x = -200;

function piexUpdate(game, pointer) {
	
	//posicao perfeita (currentPoint.x, currentPoint.y)
	//boneco = game.add.sprite(graphics.x,graphics.y-200, 'boneco');
	checkPointer(pointer,100);
	//console.log(pointerDown);
	if (pointerGrabbed){
		
		currentCursorPoint.set(currentPoint.x, currentPoint.y);
		if(!piActive){
			boneco.x = currentCursorPoint.x + 380;
			boneco.y = currentCursorPoint.y + 280;
			highlight = true;
		}
		//if(currentPoint.x )

	} else{
		currentCursorPoint.set(boneco.x - 400,boneco.y - 300); //24, -188
		highlight = false;
		console.log(currentPoint.x);
		if(isInPlace(pos1x) || isInPlace(pos2x) || isInPlace(pos3x) || isInPlace(pos4x) || isInPlace(pos5x) || isInPlace(pos6x)){
			piActive = true;
		}
		
		
	}
	game.time.advancedTiming = true;
	0
	//translação circunferencia
	x = game.time.totalElapsedSeconds();
	if (dist < 200*Math.PI){
		if (piActive){
			dist = dist +1;
		}
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

	var cont = 0;
	graphics.moveTo(0,0);
		
		//graphics.lineStyle(2, 0xFFFFFF, 1);
	for (var i = -400; i <= 400; i+= 25){
		graphics.moveTo(i,50);
		graphics.lineTo(i,100);
	}
	graphics.moveTo(-400,75);
	graphics.lineTo(400, 75);

	if (highlight){
		graphics.beginFill(0x00FF00, 0.5);
		graphics.drawRect(pos1x,posy,25,50);
		graphics.drawRect(pos2x,posy,25,50);
		graphics.drawRect(pos3x,posy,25,50);
		graphics.drawRect(pos4x,posy,25,50);
		graphics.drawRect(pos5x,posy,25,50);
		graphics.drawRect(pos6x,posy,25,50);

	}
}

var y = 0;
var text;

function planoCartesiano(graphics){
	graphics.lineStyle(3, 0xffd900, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	y = 0;
	//graphics.moveTo(Math.PI*100 - 300,60);
	//graphics.lineTo(Math.PI*100 - 300,70);
	//text = game.add.text(94, 370, "0", {fontSize: '24px', fill:'#FFFFFF'});
	for (var x= 0; x<12;x++){
		y = y+100;
		graphics.moveTo(-600+y,40);
		graphics.lineTo(-600+y,60);
		//text = game.add.text(-8+y, 370, (y/100)-1, {fontSize: '24px', fill:'#FFFFFF'});
	}

}

function debugRender(){
	game.debug.pointer(game.input.mousePointer);
}

function isInPlace(posx){
	//if (boneco.x >= 380 && boneco.x <= 455){
	if(boneco.x >= 400 - posx - 50 && boneco.x <= 400 - posx){
		//if (boneco.y >= 330 && boneco.y <= 395 ){
		if (boneco.y >= 400 - posy - 50 && boneco.y <= 400 - posy){
			return true;
		}
	}
	return false;
}