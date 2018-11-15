//variabelen
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer= new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//logica
var update = function() {

};

//visueel weergeven
var render = function() {
    renderer.render(scene, camera);
};

//game loop
var gameLoop = function() {
    requestAnimationFrame(gameLoop);
    update();
    render(); //renders the scene through the camera
};

//run the game loop
gameLoop();