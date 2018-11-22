//inladen OBJLoader
//import OBJLoader from 'three-obj-loader';


// basic variabelen
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// render variabelen
var renderer= new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// zorgt ervoor dat als je de browser resized je content steeds in het middel van je viewport blijft
window.addEventListener('resize',function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

//Astmanaut
var loader = new THREE.FileLoader();
	loader.load( 'app.json', function ( text ) {

	var player = new APP.Player();
	player.load( JSON.parse( text ) );
	player.setSize( window.innerWidth, window.innerHeight );
	player.play();

	document.body.appendChild( player.dom );

	window.addEventListener( 'resize', function () {
	    player.setSize( window.innerWidth, window.innerHeight );
	} );

} );

// camera naar achter zetten om te kunnen kijken op de figuur
camera.position.z = 5;

// logica
var update = function() {
    //ronddraaien van de kubus
};

// visueel weergeven
var render = function() {
    renderer.render(scene, camera);
};

// game loop
var gameLoop = function() {
    requestAnimationFrame(gameLoop);
    update();
    render(); //renders the scene through the camera
};

// run the game loop - werkt zoals de init() functie in javascript
gameLoop();