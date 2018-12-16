function SceneSubject(scene,camera) {

	const decibelMeter = document.getElementById("decibelMeter");

	//get Microphone
	navigator.getUserMedia = navigator.getUserMedia ||
  	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia;

	if (navigator.getUserMedia) {
		navigator.getUserMedia({
			audio: true
		  },
	  
		  function(stream,camera) {
			console.log("Uw audio komt erin! Is it a 10/20?");
			audioContext = new AudioContext();
			analyser = audioContext.createAnalyser();
			microphone = audioContext.createMediaStreamSource(stream);
			javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);
	  
			analyser.smoothingTimeConstant = 0.8;
			analyser.fftSize = 1024;
	  
			microphone.connect(analyser);
			analyser.connect(javascriptNode);
			javascriptNode.connect(audioContext.destination);

	  
	  
			javascriptNode.onaudioprocess = function(camera) {
				let array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
				let values = 0;
	  
				let length = array.length;
				for (let i = 0; i < length; i++) {
				  values += (array[i]);
				}
	  
				let average = values / length;

				update(average,camera);
			  }
		  },
		  function(err) {
			console.log("Ge hebt een foutje namelijk: " + err.name)
		  });
	  } else {
		console.log("getUserMedia werkt ier nie!");
	  }


	const radius = 2;
	const mesh = new THREE.Mesh(new THREE.IcosahedronBufferGeometry(radius, 2), new THREE.MeshStandardMaterial({
		flatShading: true
	}));
	mesh.position.set(0, 0, -20);
	scene.add(mesh);

	const update = (average,camera) => {
		if(average > 10){
			mesh.position.y += 0.30;
			//camera.rotation.x += 1;
		}else {
			mesh.position.y -= 1;
			mesh.position.set(0, 0, -20);
		}
		decibelMeter.innerText = Math.round(average) + " " + "miles travelled";
		//mesh.position.y += average/100;
		//camera.position.z = 8 + average;
	}

	this.update = function (time) {

	}
}