const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);
const domUIManager = new DomUIManager();
const eventBus = new EventBus();


//const eventBus = new EventBus()

const bindEventListeners = () => {
	window.onresize = resizeCanvas;
	resizeCanvas();
}

const resizeCanvas = () => {
	canvas.style.width = '100vw';
	canvas.style.height = '100vh';
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	sceneManager.onWindowResize();
}

const render = () => {
	requestAnimationFrame(render);
	sceneManager.update();
}

function begin() {	
	domUIManager.showUI()
	render()
 }

const init = () => {
	bindEventListeners();
	render();
}

init();
