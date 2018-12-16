// class Astronaut {
//     constructor() {
//         const loader = new THREE.ObjectLoader();
//         this.mesh = new THREE.Object3D();

//         loader.load("./models/model.json",
//         (obj) => {
//             obj.position.y += -2;
//             obj.rotation.x += -1.5;
//             obj.rotation.z += -3;
//             this.mesh.add(obj);
//         }
//     );
//     }
// }


function AstronautEnvironment(scene,camera) {

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
			console.log("Audio works");
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

    const loader = new THREE.ObjectLoader();
    const mesh = new THREE.Object3D();
    this.mesh = mesh;

    //astronaut model inladen
    loader.load("../models/model.json",
        function (obj) {
            obj.position.y += -2;
            obj.rotation.x += -1.5;
            obj.rotation.z += -3;
            mesh.add(obj);
        }
    );

    //mountain environment model inladen
    loader.load("../models/tall-mountains.json",
        function (obj) {
            obj.position.y += -6;
            obj.rotation.y += -1;
            obj.scale.set(10, 5, 10);
            scene.add(obj);
        }
    );


    const update = (average) => {
		
		if(average > 10){
			mesh.position.y += 0.30;
			if(average < 10){
				decibelMeter.innerText = Math.round(mesh.position.y) + " " + "total miles travelled";
			}
		}else {
			mesh.position.y -= 1;
			mesh.position.set(0, 0, 0);
        }

        decibelMeter.innerText = Math.round(mesh.position.y) + " " + "miles travelled";
	}

    this.update = function (time) {
		
        }
}