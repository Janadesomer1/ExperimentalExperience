const canvas = document.getElementById("canvas");
const sceneManager = new SceneManager(canvas);

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

const init = () => {
	bindEventListeners();
	render();
}

init();
