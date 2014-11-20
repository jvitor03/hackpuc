/**
 * Arquivo que contém todas as constantes utilizadas pelo app
 */
 // A definição do Ponto começa aqui
function Ponto(nx, ny) {
	this.x = nx;
	this.y = ny;
}

/**
 * O método set atribui os valores nx e ny para 
 */
Ponto.prototype.set = function(nx, ny) {
	if (typeof nx == 'number' && typeof ny == 'number') {
		this.x = nx;
		this.y = ny;
	}
}

Ponto.prototype.getX = function() {
	return this.x;
}

Ponto.prototype.getY = function() {
	return this.y;
}

// Inicialização de funções
function checkPointer(pointer) {
	// Começar do ponto (0, 0) e ir até (100, 0)
	if (pointer.isDown) {
		currentPoint.x = pointer.x - graphics.x;
		currentPoint.y = pointer.y - graphics.y;
		// vamos checar se estamos segurando o ponto
		if (!pointerDown) {
			// ainda vamos clicar no ponto
			pointerDown = true;
			// verificamos se estamos na área clicável
			// if (isPointerGrabbingCircle(currentPoint.x, currentPoint.y, currentCursorPoint.x, currentCursorPoint.y)) {
			if (Phaser.Point.distance(currentPoint, currentCursorPoint) < clickableRadiusArea) {
				pointerGrabbed = true;
			}
		}
		
	} else {
		pointerDown = false;
		pointerGrabbed = false;
	}
}

// ------- Inicialização de constantes -------
// Sugestão: usar padronização do Java, constantes possuem letras maiúsculas
// separadas por sublinhados, exemplo: ESSA_E_UMA_CONSTANTE
// TODO verificar se constantes e variáveis serão escritas em inglês

var SCREEN_WIDTH  = 800;
var SCREEN_HEIGHT = 600;

var pointerGrabbed = false;
var pointerDown = false;
var clickableRadiusArea = 28;