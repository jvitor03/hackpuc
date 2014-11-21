// Aqui as variáveis terão o prefixo pi
// Imaginei que armazenar num array fosse melhor, mas eles não manterão
// os nomes como algo significativo, então pode acabar me confundindo
// Por essa razão, eu irei trabalhar com as variáveis de forma que elas
// tenham nomes significativos referentes aos seus passos
var piFinished = false;

var initialPoint = new Ponto(0, 0);
var destPoint = new Ponto(100, 0);

var currentPointerRadius = 8;
var lineSize = 4;
var bgLineSize = 2;

var bgColor = 0x000000;
var bgLnColor = 0x777777;
var lnColor = 0x18bc9c;

// Cores #18bc9c

var piStepDone = new Array(false, false, false, false);
// var piStepDone = new Array(true, true, true, false);

// variáveis relacionadas ao passo zero: do ponto para a reta
var piStep0InitialPoint = new Ponto(0, 0);
var piStep0DestPoint = new Ponto(100, 0);

// variáveis relacionadas ao passo um: do fim da reta para o círculo
var piStep1InitialPoint = new Ponto(100, 0);
var piStep1CircleCenter = new Ponto(0, 0);
var piStep1Diameter = 200;
var piStep1Radius = 100;
var piStep1RadiansAtan2;
var piStep1RadiansLimit;
var piStep1QuadOk = false;

// variáveis relacionadas ao passo dois: "copiar" círculos
var piStep2TransitionPoint = new Ponto(0, 0);
var piStep2OriginalCircleCenter = new Ponto(-300, 0);

var piStep2CirclesCenters = new Array (
	new Ponto(-100, 0),
	new Ponto(100, 0),
	new Ponto(300, 0)
);

var piStep2CircleRadius = 100;
var piStep2CircleDiameter = 200;

var piStep2PhantomCircle = false;

var piStep2CircleSelected = new Array(false, false ,false);
var piStep2FilledCircles = 0;

// variáveis relacionadas a "puxar" o círculo
var piStep3TransitionVerticalLines = new Array(
	new Ponto(-300, 100), // ponto inicial
	new Ponto(-300, 100), // ponto final

	new Ponto(-100, 100), // ponto inicial
	new Ponto(-100, 100), // ponto final

	new Ponto(100, 100),  // ponto inicial
	new Ponto(100, 100),  // ponto final

	new Ponto(300, 100), // ponto inicial
	new Ponto(300, 100) // ponto final
);

var piStep3TransitionVerticalLength = 300;

var piStep3InitialPoint = new Ponto(-300, 100);
var piStep3VerticalLineStart = new Ponto(-300, -150);
var piStep3Angle = 0;
var piStep3CircleToLine = 0;

var piStateTime = 0;

var piTransition = false;

var endTime = 0;

/**
 * @param game Contexto game criado na página principal
 */
function piUpdate(game, pointer) {
	piStateTime += game.time.elapsed;

	if (piTransition) {
		if (piStepDone[3]) {
		} else if (piStepDone[2] ) {
			createVerticalLines();
		} else if (piStepDone[1]) {
			// transição do círculo para a esquerda
			transitionToTheLeft();
		} else if (piStepDone[0]) {
			
		}
	} else if (!piStepDone[0]) {
		checkPointer(pointer, clickableRadiusArea);
		piStepZero();
	} else if (!piStepDone[1] ) {
		checkPointer(pointer, clickableRadiusArea);
		piStepOne();
	} else if (!piStepDone[2]) {
		checkPointer(pointer, clickableRadiusArea * 2);
		piStepTwo();
	} else if (!piStepDone[3]) {
		checkPointer(pointer, clickableRadiusArea);
		piStepThree();
	} else {
		currentCursorPoint.x = -300;
		currentCursorPoint.y = 100;
		endTime += game.time.elapsed;

		if (endTime > 4000) {
			piText.kill();
			piFinished = true;
			pointerGrabbed = false;
			boneco.x = graphics.x;
			boneco.y = graphics.y-200;
		}
	}
}

/*
 * Move o círculo principal para a esquerda e introduz os outros de forma devagar
 */
function transitionToTheLeft() {
	piStep2TransitionPoint.x = Phaser.Math.interpolateFloat(piStep2TransitionPoint.x, piStep2OriginalCircleCenter.x, .1);
	currentCursorPoint.x = piStep2TransitionPoint.x;
	currentCursorPoint.y = piStep2TransitionPoint.y;
	if (Phaser.Point.distance(piStep2TransitionPoint, piStep2OriginalCircleCenter) < 2) {
		piTransition = false;
	}
}

// + 300
function createVerticalLines() {
	// Desenhar o grid vertical
	currentCursorPoint.y = Phaser.Math.interpolateFloat(currentCursorPoint.y, piStep3InitialPoint.y, .6);

	for (var i = 0; i < 8; i += 2) {
		if (Phaser.Point.distance(piStep3TransitionVerticalLines[i], piStep3TransitionVerticalLines[i+1]) > 298) {
			continue;
		} 

		piStep3TransitionVerticalLines[i+1].y = Phaser.Math.interpolateFloat(piStep3TransitionVerticalLines[i+1].y, 
				piStep3TransitionVerticalLines[i].y - piStep3TransitionVerticalLength, .1);
		break;
	
	}
	if (Phaser.Point.distance(piStep3TransitionVerticalLines[6], piStep3TransitionVerticalLines[7]) > 298) {
		piTransition = false;
	}
}

function piStepZero() {
	if (pointerGrabbed) {
		currentCursorPoint.x = Phaser.Math.clamp(currentPoint.x, piStep0InitialPoint.x, piStep0DestPoint.x);
		if (currentCursorPoint.x == piStep0DestPoint.x) {
			piStepDone[0] = true;
		}
	} else {
		currentCursorPoint.x = piStep0InitialPoint.x;
	}
}

function piStepOne() {
	if (pointerGrabbed) {
		// Queremos apenas valores menores que zero e maiores que um limitezinho hardcoded
		var tmp;
		if (!piStep1QuadOk) {
			tmp = Phaser.Math.clamp(Math.atan2(currentPoint.y, currentPoint.x), -Math.PI, 0);
		} else {
			tmp = Math.atan2(currentPoint.y, currentPoint.x);
		}
		
		if (tmp < -3) {
			piStep1QuadOk = true;
		} else if (tmp < 0) {
			piStep1QuadOk = false;
		}
		piStep1RadiansAtan2 = tmp;
		currentCursorPoint.x = Math.cos(piStep1RadiansAtan2) * piStep1Radius;
		currentCursorPoint.y = Math.sin(piStep1RadiansAtan2) * piStep1Radius;

		if (piStep1QuadOk && piStep1RadiansAtan2 < .2 && piStep1RadiansAtan2 > 0) {
			piStepDone[1] = true;
			pointerGrabbed = false;
			piTransition = true;
		}
	} else {
		currentCursorPoint.x = piStep1InitialPoint.x;
		currentCursorPoint.y = piStep1InitialPoint.y;
		piStep1RadiansAtan2 = 0;
		piStep1QuadOk = false;
	}

}

function piStepTwo() {
	if (pointerGrabbed) {
		piStep2PhantomCircle = true;
		currentCursorPoint.x = currentPoint.x;
		currentCursorPoint.y = currentPoint.y;

	} else {
		if (piStep2PhantomCircle) {
			piStep2PhantomCircle = false;
			// verifica se o círculo foi jogado próximo de outro círculo
			// A tolerância é razoável
			for (var i = 0; i < piStep2CirclesCenters.length; i++) {
				if (Phaser.Point.distance(piStep2CirclesCenters[i], currentCursorPoint) < 32) {
					piStep2CircleSelected[i] = true;
				}
			}
		}
		
		currentCursorPoint.x = piStep2OriginalCircleCenter.x;
		currentCursorPoint.y = piStep2OriginalCircleCenter.y;
	}
	for (var i = 0; i < piStep2CircleSelected.length; i++) {
		if (piStep2CircleSelected[i]) {
			piStep2FilledCircles++;
		} else {
			piStep2FilledCircles = 0;
		}
	}
	if (piStep2FilledCircles == piStep2CircleSelected.length) {
		// Vamo esticar esse círculo?
		piStepDone[2] = true;
		piTransition = true;
	}
}

var piStep3QuadOk = false;

function piStepThree() {
	if (pointerGrabbed) {
		var tmp;
		var tmp2;

		// tmp2 = Math.atan2(-(currentPoint.y), -(currentPoint.x+300));
		tmp2 = Math.atan2(-(currentPoint.x+300), -(currentPoint.y));

		if (!piStep3QuadOk) {
			// tmp = Phaser.Math.clamp(Math.atan2(currentPoint.y, currentPoint.x+300), Math.PI/2, Math.PI);
		} else {
			// tmp = Math.atan2(currentPoint.y, currentPoint.x+300);
		}
		tmp = Math.atan2(currentPoint.y, currentPoint.x+300);
		/*
		if (tmp > 2.7) {
			piStep3QuadOk = true;
		} else if (tmp > Math.PI-.4) {
			piStep3QuadOk = false;
		}
		*/

		/*
		if (currentCursorPoint.x > -370 && currentCursorPoint.y < -70) {
			piStep3QuadOk = false;
		} else {
			piStep3QuadOk = true;
		}
		*/

		piStep3Angle = tmp;
		currentCursorPoint.x = Math.cos(piStep3Angle) * piStep1Radius - 300;
		currentCursorPoint.y = Math.sin(piStep3Angle) * piStep1Radius;
	
		piStep3CircleToLine = -(100 * tmp2) + 300;

		if (piStep3CircleToLine > 600) {
			piStepDone[3] = true;
		}
		
	} else {
		currentCursorPoint.x = piStep3InitialPoint.x;
		currentCursorPoint.y = piStep3InitialPoint.y;
		piStep3Angle = Math.PI/2;
		piStep3QuadOk = false;
		tmp2 = 0;
		piStep3CircleToLine = 0;
	}
}

function piRender(graphics) {
	// limpar a tela
	graphics.clear();

	backgroundRender(graphics);

	// Redefinir linestyle
	// linestyle(larguraDaLinha, cor, alpha);
	graphics.lineStyle(lineSize, lnColor, 1);	

	// arc ( cx  cy  radius  startAngle  endAngle  anticlockwise )
	// graphics.arc(0, 0, 100, 0, Math.PI*11/5, true);
	if (piStepDone[3]) {
		piText.x = 580;
		piText.y = 200;

		graphics.moveTo(-300, 100);
		graphics.lineTo(-300 + Math.PI*200, 100);
	} else if (piStepDone[2]) {
		// Arco que vai ser desenrolado
		// O objetivo é sair de Math.PI/2 e chegar até Math.PI*5/2
		// Então vamos incrementando o valor do ângulo dentro de Math.PI
		if (piStep3Angle >= Math.PI/2) {
			graphics.arc(-300+piStep3CircleToLine, 0, 100, Math.PI*5/2, piStep3Angle, true);
		} else {
			graphics.arc(-300+piStep3CircleToLine, 0, 100, piStep3Angle, Math.PI*5/2, true);
		}

		graphics.moveTo(-300, 100);
		graphics.lineTo(-300 + piStep3CircleToLine, 100);

		// vamos pegar emprestado os círculos do passo anterior
	} else if (piStepDone[1]) {
		if (piTransition) {
			graphics.drawCircle(piStep2TransitionPoint.x, piStep2TransitionPoint.y, piStep1Diameter);
		} else {
			drawStep2Circles(graphics);
		}
		
		// Vamos desenhar um fantasma, caso ele exista...
		if (piStep2PhantomCircle) {
			graphics.lineStyle(lineSize, lnColor, .3);
			graphics.drawCircle(currentCursorPoint.x, currentCursorPoint.y, 200);
		}		
	} else if (piStepDone[0]) {
		graphics.moveTo(piStep0InitialPoint.x, piStep0InitialPoint.y);
		graphics.lineTo(currentCursorPoint.x, currentCursorPoint.y);
		graphics.arc(0, 0, piStep1Radius, 0, piStep1RadiansAtan2, true);
	} else {
		graphics.moveTo(piStep0InitialPoint.x, piStep0InitialPoint.y);
		graphics.lineTo(currentCursorPoint.x, currentCursorPoint.y);
	}

	// Vamos criar o beginFill(cor, alpha)
	drawCurrentPointer(graphics);
}

function drawCurrentPointer(graphics) {
	if (piStateTime % 1024 < 128) {
		graphics.drawCircle(currentCursorPoint.x, currentCursorPoint.y, currentPointerRadius + Math.sin(pointer)*12);
	}

	graphics.beginFill(lnColor, 1);
	graphics.drawCircle(currentCursorPoint.x, currentCursorPoint.y, currentPointerRadius + (pointerGrabbed ? (Math.sin(pointer.duration/397)+Math.PI*2) : 0));
	graphics.endFill();
}

function drawStep2Circles() {
	graphics.drawCircle(piStep2OriginalCircleCenter.x, piStep2OriginalCircleCenter.y, piStep1Diameter);
	// Vamos desenhar os círculos já determinados
	for (var i = 0; i < piStep2CircleSelected.length; i++) {
		if (piStep2CircleSelected[i]) {
			graphics.drawCircle(piStep2CirclesCenters[i].x, piStep2CirclesCenters[i].y, 200);
		}
	}
}

function backgroundRender(graphics) {
	graphics.lineStyle(bgLineSize, bgLnColor, .5);
	// Queremos desenhar o ponto que o usuário deve percorrer
	if (!piStepDone[0]) {
		graphics.moveTo(currentCursorPoint.x, currentCursorPoint.y);
		graphics.lineTo(piStep0DestPoint.x, piStep0DestPoint.y);
	} else if (!piStepDone[1]) {
		// Vamos definir a linha de contorno do nosso círculo
		graphics.lineStyle(2, bgLnColor, 1);
		// Desenhamos a partir dos pontos iniciais, aí precisamos do dobro
		// do ponto atual
		graphics.drawCircle(piStep1CircleCenter.x, piStep1CircleCenter.y, piStep1Diameter);
	} else if (!piStepDone[2]) {
		graphics.lineStyle(2, bgLnColor, 1);
		for (var i = 0; i < piStep2CirclesCenters.length; i++) {
			if (piTransition) {
				graphics.drawCircle(piStep2CirclesCenters[i].x, piStep2CirclesCenters[i].y, 200);
			} else {
				graphics.drawCircle(piStep2CirclesCenters[i].x, piStep2CirclesCenters[i].y, 200);
			}
			
		}
		// Desenhar linha horizontal de suporte
		graphics.moveTo(-SCREEN_WIDTH, 100);
		graphics.lineTo(SCREEN_WIDTH, 100);
		
	} else if (!piStepDone[3]) {
		graphics.drawCircle(piStep2OriginalCircleCenter.x + piStep3CircleToLine, piStep2OriginalCircleCenter.y, piStep1Diameter);
		// Vamos desenhar os círculos já determinados
		/*
		for (var i = 0; i < piStep2CircleSelected.length; i++) {
			if (piStep2CircleSelected[i]) {
				graphics.drawCircle(piStep2CirclesCenters[i].x, piStep2CirclesCenters[i].y, 200);
			}
		}
		*/

		if (piTransition) {
			for (var i = 0; i < piStep2CircleSelected.length; i++) {
				if (piStep2CircleSelected[i]) {
					graphics.drawCircle(piStep2CirclesCenters[i].x, piStep2CirclesCenters[i].y, 200);
				}
			}
		}
		// Desenhar o grid vertical
		for (var i = 0; i < piStep3TransitionVerticalLines.length; i += 2) {
			// graphics.moveTo(piStep3VerticalLineStart.x + i*200, piStep3VerticalLineStart.y);
			// graphics.lineTo(piStep3VerticalLineStart.x + i*200, piStep3VerticalLineStart.y + 300);
			graphics.moveTo(piStep3TransitionVerticalLines[i].x, piStep3TransitionVerticalLines[i].y);
			graphics.lineTo(piStep3TransitionVerticalLines[i+1].x, piStep3TransitionVerticalLines[i+1].y);
		}
		// Desenhar linha horizontal de suporte
		graphics.moveTo(-SCREEN_WIDTH, 100);
		graphics.lineTo(SCREEN_WIDTH, 100);
	} else {
		graphics.moveTo(-SCREEN_WIDTH, 100);
		graphics.lineTo(SCREEN_WIDTH, 100);

		// Desenhar o grid vertical
		for (var i = 0; i < piStep3TransitionVerticalLines.length; i += 2) {
			// graphics.moveTo(piStep3VerticalLineStart.x + i*200, piStep3VerticalLineStart.y);
			// graphics.lineTo(piStep3VerticalLineStart.x + i*200, piStep3VerticalLineStart.y + 300);
			graphics.moveTo(piStep3TransitionVerticalLines[i].x, piStep3TransitionVerticalLines[i].y);
			graphics.lineTo(piStep3TransitionVerticalLines[i+1].x, piStep3TransitionVerticalLines[i+1].y);
		}
	}
}