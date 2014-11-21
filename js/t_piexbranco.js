
var piexFinished = false;
var dist = 0;
var x = 0;
var pontoatual = new Ponto(0,0);
var boneco;
function piexCreate(game){
	// boneco = game.add.sprite(graphics.x,graphics.y-200, 'boneco');
	boneco = game.add.sprite(900, 1000, 'boneco');
	boneco.animations.add('idle', [0,1,2,3,4], 10, true);
	boneco.animations.add('drag', [5,6,7,8,9], 10,true);
	boneco.animations.add('death', [10,11,12,13,14], 10, true);
	//boneco.animations.add('smash', [0,1,2,3,4], 10, true);
	
	boneco.scale.setTo(0.5,0.5);
}

var highlight = false;
var piActive = false;
var pos1x = 0;
var posy = 35;
var pos2x = 100;
var pos3x =200;
var pos4x = 300;
var pos5x = -100;
var pos6x = -200;
var dead = false;

var win = false;
var terminou = false;
var disableGrid = false;

//cores

var cor_grid = 0x000000; // 0xFFFFFF
var cor_highlight = 0x00FF00; //0x00FF00
var cor_marcacoes_grid = 0x0000CC; //0x0000CC
var cor_circulo = 0xFF0000; //0xFF0000

function piexUpdate(game, pointer) {
	
	//posicao perfeita (currentPoint.x, currentPoint.y)
	//boneco = game.add.sprite(graphics.x,graphics.y-200, 'boneco');
	checkPointer(pointer,100);
	//console.log(pointerDown);
	if (pointerGrabbed){
		
		currentCursorPoint.set(currentPoint.x, currentPoint.y);
		if(!piActive){
			boneco.animations.play('drag');
			boneco.x = currentCursorPoint.x + 380;
			boneco.y = currentCursorPoint.y + 280;
			highlight = true;
		}
		//if(currentPoint.x )

	} else{
		if(!dead){
			boneco.animations.play('idle');
		}
		currentCursorPoint.set(boneco.x - 400,boneco.y - 300); //24, -188
		highlight = false;
		//console.log(boneco.x);
		if (isInPlace()){
			win = true;
		}
		if(start()){
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
	}else{
		terminou = true;
	}

	if (win && terminou){
		disableGrid = true;
	}
	
	//debugRender();
}

var go;

function piexRender(graphics){

	graphics.clear();
	
	graphics.lineStyle(2, cor_grid, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	graphics.lineStyle(2, cor_circulo, 1);
	go = -300+ dist
	arco = graphics.arc(-300 + dist,0,50,dist/50+1.9,dist/50+7.5);

	if (go+12 >= boneco.x - 400){
		if(piActive && !isInPlace()){
			boneco.animations.play('death');
			dead = true;
		}
		
	}

	var cont = 0;
	graphics.moveTo(0,0);
		
		//graphics.lineStyle(2, cor_grid, 1);
	if (!disableGrid){
		graphics.lineStyle(2, cor_grid, 1);
		for (var i = -400; i <= 400; i+= 25){
			graphics.moveTo(i,50);
			graphics.lineTo(i,85);
		}	
		graphics.moveTo(-400,85);
		graphics.lineTo(400, 85);
	}

	if (highlight){
		graphics.beginFill(cor_highlight, 0.5);
		/*graphics.drawRect(pos1x,posy,25,50);
		graphics.drawRect(pos2x,posy,25,50);
		graphics.drawRect(pos3x,posy,25,50);
		graphics.drawRect(pos4x,posy,25,50);
		graphics.drawRect(pos5x,posy,25,50);
		graphics.drawRect(pos6x,posy,25,50);*/
		graphics.drawRect(-600,posy,1200, 50);

	}
	planoCartesiano(graphics);
}

var y = 0;
var text;

function planoCartesiano(graphics){
	graphics.lineStyle(3, cor_grid, 1);
	graphics.moveTo(-600,50);
	graphics.lineTo(600,50);
	y = 0;
	//graphics.moveTo(Math.PI*100 - 300,60);
	//graphics.lineTo(Math.PI*100 - 300,70);
	if (disableGrid){
		text = game.add.text(94, 400, "0", {fontSize: '24px', fill:'#000000'});
	}
	for (var x= 0; x<12;x++){
		y = y+100;
		graphics.lineStyle(3, cor_marcacoes_grid, 1);
		graphics.moveTo(-600+y,35);
		graphics.lineTo(-600+y,85);
		if (disableGrid){
			game.add.text(-8+y, 400, (y/100)-1, {fontSize: '24px', fill:'#000000'});
		}
	}

}

function debugRender(){
	game.debug.pointer(game.input.mousePointer);
}

function isInPlace(){
	//if (boneco.x >= 380 && boneco.x <= 455){
	if(boneco.x > 385 && boneco.x <= 400){
		//if (boneco.y >= 330 && boneco.y <= 395 ){
		if (boneco.y > 331 && boneco.y < 340){
			//console.log("te");
			return true;

		}
	}
	return false;
}

function start(){
	if (boneco.y >= 331 && boneco.y < 340){
		//console.log("ste");
		return true;
	}
	return false;

}

