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
var lnColor = 0xFFFFFF;

var piStepDone = new Array(false, false, false);

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
var piStep2OriginalCircleCenter = new Ponto(-300, 0);

var piStep2CirclesCenters = new Array (
	new Ponto(-100, 0),
	new Ponto(100, 0),
	new Ponto(300, 0)
);

var piStep2CircleRadius = 100;
var piStep2CircleDiameter = 200;

// variáveis relacionadas a puxar o círculo

/**
 * @param game Contexto game criado na página principal
 */
function piUpdate(game, pointer) {
	
	if (!piStepDone[0]) {
		checkPointer(pointer, clickableRadiusArea);
		piStepZero();
	} else if (!piStepDone[1]) {
		checkPointer(pointer, clickableRadiusArea);
		piStepOne();
	} else if (!piStepDone[2]) {
		checkPointer(pointer, clickableRadiusArea * 2);
		piStepTwo();
	}
	debugRender(game);
}

function piStepZero() {
	if (pointerGrabbed) {
		console.log(currentPoint.x);
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

		if (piStep1QuadOk && piStep1RadiansAtan2 < .3 && piStep1RadiansAtan2 > 0) {
			piStepDone[1] = true;
			pointerGrabbed = false;
		}
		// currentCursorPoint.x = currentPoint.x;
		// currentCursorPoint.y = currentPoint.y;
	} else {
		currentCursorPoint.x = piStep1InitialPoint.x;
		currentCursorPoint.y = piStep1InitialPoint.y;
		piStep1RadiansAtan2 = 0;
		piStep1QuadOk = false;
	}

}

var piStep2PhantomCircle = false;
var piStep2GrabbingCircle = false;

function piStepTwo() {
	if (pointerGrabbed) {
		piStep2PhantomCircle = true;
		currentCursorPoint.x = currentPoint.x;
		currentCursorPoint.y = currentPoint.y;

	} else {
		currentCursorPoint.x = piStep2OriginalCircleCenter.x;
		currentCursorPoint.y = piStep2OriginalCircleCenter.y;
		if (piStep2PhantomCircle) {
			piStep2PhantomCircle = false;
			// verifica se o círculo foi jogado próximo de outro círculo
			// A tolerância é razoável
		}
		
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
	if (piStepDone[1]) {
		graphics.drawCircle(piStep2OriginalCircleCenter.x, piStep2OriginalCircleCenter.y, piStep1Diameter);
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
	graphics.beginFill(lnColor, 1);
	graphics.drawCircle(currentCursorPoint.x, currentCursorPoint.y, currentPointerRadius);
	graphics.endFill();
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
			graphics.drawCircle(piStep2CirclesCenters[i].x, piStep2CirclesCenters[i].y, 200);
		}
		
	}
}

function debugRender(game) {
	game.debug.pointer(game.input.mousePointer);
}