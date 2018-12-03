function SceneSubject(scene) {

	//get Microphone
	navigator.getUserMedia = navigator.getUserMedia ||
  	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia({
			audio: true
		  },
	  
		  function(stream) {
			audioContext = new AudioContext();
			analyser = audioContext.createAnalyser();
			microphone = audioContext.createMediaStreamSource(stream);
			javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
	  
			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;
	  
			microphone.connect(analyser);
			analyser.connect(javascriptNode);
			javascriptNode.connect(audioContext.destination);

	  
	  
			javascriptNode.onaudioprocess = function() {
				var array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				var values = 0;
	  
				var length = array.length;
				for (var i = 0; i < length; i++) {
				  values += (array[i]);
				}
	  
				var average = values / length;

				update(average);
			  }
		  },
		  function(err) {
			console.log("The following error occured: " + err.name)
		  });
	  } else {
		console.log("getUserMedia not supported");
	  }


	const radius = 2;
	const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({
		flatShading: true
	}));
	mesh.position.set(0, 0, -20);
	scene.add(mesh);

	const update = (average) => {
		const scale = 1 + average;
		mesh.scale.set(scale, scale, scale);
	}

	this.update = function (time) {

	}
}