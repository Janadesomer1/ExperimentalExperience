var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


var renderer= new THREE.WebGLRenderer({canvas: document.getElementById('myCanvas'), antialias:true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// browser resize
window.addEventListener('resize',function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
})

var loader = new THREE.ObjectLoader();

loader.load(
	"js/assets/models/model.json",

	function ( obj ) {
		var light = new THREE.PointLight( 0xffffff, 3, 1000 ); 
		light.position.set( 20, 20, 20 );
		obj.rotation.x += -1;
		scene.add( obj,light );
	},

	function ( xhr ) {
		console.log( (xhr.loaded / xhr.total * 100) + '% van het astronaut model ingeladen' );
	},

	function ( err ) {
		console.error( 'astronaut model niet ingeladen' );
	}
);



    //var light = new THREE.AmbientLight(0xffffff);
    //scene.add(light);

camera.position.z = 5;


// logica
var update = function() {
    //cube.rotation.x += .01;
    //cube.rotation.y += .005;
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