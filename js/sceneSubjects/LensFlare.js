function LensFlare(scene) {
    
    scene.fog = new THREE.Fog( scene.background, 3500, 15000 );

    // lensflares
    let textureLoader = new THREE.TextureLoader();
    let textureFlare0 = textureLoader.load( 'textures/lensflare0.png' );
    let textureFlare3 = textureLoader.load( 'textures/lensflare3.png' );

    //addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
    addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
    addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

    function addLight( h, s, l, x, y, z ) {
        let light = new THREE.PointLight( 0xffffff, 1.5, 2000 );
        light.color.setHSL( h, s, l );
        light.position.set( x, y, z );
        scene.add( light );

        let lensflare = new THREE.Lensflare();
        lensflare.addElement( new THREE.LensflareElement( textureFlare0, 700, 0, light.color ) );
        lensflare.addElement( new THREE.LensflareElement( textureFlare3, 60, 0.3 ) );
        // lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 0.7 ) );
        // lensflare.addElement( new THREE.LensflareElement( textureFlare3, 120, 0.9 ) );
        // lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 1 ) );
        light.add( lensflare );
    }

	this.update = function(time) {
	}
}