function Lights(scene) {
	const spotLight = new THREE.SpotLight( "#fff", 1, 400, Math.PI/3, 0, 2);
	spotLight.position.set( 0, 100, 0 );
	spotLight.target.position.set(0,0,0);
	spotLight.castShadow = true
	scene.add( spotLight );
	scene.add( spotLight.target );

	const pointLight = new THREE.PointLight( "#fff", .5, 400 );
	pointLight.position.set( 0, 10, 0 );
	scene.add( pointLight );
	
	this.update = function(time) {
	}
}