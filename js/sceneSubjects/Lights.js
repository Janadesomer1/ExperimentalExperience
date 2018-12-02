function Lights(scene) {
	const spotLight = new THREE.SpotLight( "black", 1, 400, Math.PI/3, 0, 1);
	spotLight.position.set( 0, 200, 0 );
	spotLight.target.position.set(0,0,0);
	spotLight.castShadow = true;
	scene.add( spotLight );
	scene.add( spotLight.target );

	// const pointLight = new THREE.PointLight( "#000000", 1, 400 );
	// pointLight.position.set( 0, 10, 0 );
	// scene.add( pointLight );

	//daglicht, in ons geval, nacht light
	const directionalLight = new THREE.DirectionalLight( "#551A8B", 1 );
	scene.add( directionalLight );
	
	this.update = function(time) {
	}
}