/**
 * Arquivo que contém todas as constantes utilizadas pelo app
 */
 // A definição do Ponto começa aqui
function Ponto() {
	this.x = 0;
	this.y = 0;
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

// ------- Inicialização de constantes -------
// Sugestão: usar padronização do Java, constantes possuem letras maiúsculas
// separadas por sublinhados, exemplo: ESSA_E_UMA_CONSTANTE
// TODO verificar se constantes e variáveis serão escritas em inglês

var SCREEN_WIDTH  = 800;
var SCREEN_HEIGHT = 600;